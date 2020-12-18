import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { BaseControl } from '../../base-control';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { ControlType, OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';
import { OptionComponent } from '../../../dropdown/option/option.component';
import { DropdownComponent } from '../../../dropdown/dropdown.component';
import { takeUntil } from 'rxjs/operators';
import { detectChanges, markForCheck } from '../../../common';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusOrigin } from '@angular/cdk/a11y';

@Component({
    selector: 'pa-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends BaseControl implements OnChanges, AfterViewInit, OnDestroy {
    @Input() label = '';

    @Input() placeholder = '';

    @Input() set options(values: (OptionModel | OptionSeparator | OptionHeaderModel)[]) {
        this._optionsAreNgContent = false;
        this._options = values;

        // find provided selected option
        const selectedOption: OptionModel | undefined = values.find(
            (option) => option.type === ControlType.option && (option as OptionModel).selected
        ) as OptionModel | undefined;

        if (selectedOption) {
            this.onWriteValue(selectedOption.value);
        }
    }
    get options(): (OptionModel | OptionSeparator | OptionHeaderModel)[] {
        return this._options;
    }

    @Input() set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }
    get required() {
        return this._required || false;
    }

    @Input() pattern?: RegExp | string;

    @Input() maxlength?: number;

    @Input()
    get adjustHeight(): boolean {
        return this._adjustHeight;
    }
    set adjustHeight(value: boolean) {
        this._adjustHeight = coerceBooleanProperty(value);
    }

    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() expanded: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('selectInput') selectInput?: ElementRef;
    @ViewChild('optionsDropdown') optionsDropdown?: DropdownComponent;
    @ContentChildren(OptionComponent, { descendants: true }) ngContentOptions?: QueryList<OptionComponent>;

    readonly acceptHtmlTags = false;

    _options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    optionsClosed = new Subject();
    _optionsAreNgContent = true;
    _required?: boolean;
    optionsDisplayed = false;
    selectedLabel?: string;
    displayedLabel?: string;
    _adjustHeight = false;

    requiredValidator?: ValidatorFn;
    patternValidator?: ValidatorFn;
    maxlengthValidator?: ValidatorFn;

    constructor(
        @Optional() @Self() public parentControl: NgControl,
        protected platform: Platform,
        protected ngZone: NgZone,
        public cdr: ChangeDetectorRef
    ) {
        super(parentControl, cdr);
        this._fieldKind = 'select';
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    ngAfterViewInit(): void {
        this.handleInitialValue();
        this.focus();
    }

    ngOnDestroy() {
        this.optionsClosed.next();
        this.optionsClosed.complete();
        super.ngOnDestroy();
    }

    handleInitialValue() {
        if (this.ngContentOptions && this.ngContentOptions.length > 0) {
            // subscribe to option selection
            this.ngContentOptions.forEach((option) =>
                option.selectOption.pipe(takeUntil(this.terminator)).subscribe(() => {
                    this.onValueChange(option.value);
                })
            );

            // relaunch write after printing the options
            if (!!this.model) {
                this.onWriteValue(this.model);
            }
        } else {
            this._optionsAreNgContent = false;
        }
    }

    listInternalValidators = (): ValidatorFn[] => {
        const validators = [];

        if (!!this.requiredValidator) {
            validators.push(this.requiredValidator);
        }
        if (!!this.patternValidator) {
            validators.push(this.patternValidator);
        }
        if (!!this.maxlengthValidator) {
            validators.push(this.maxlengthValidator);
        }
        return validators;
    };

    preValueChange = (value: any): any => {
        return value;
    };

    postValueChange = (): void => {
        this.selectedLabel = this.findLabelByValue(this.model);
        this.displayedLabel = this.selectedLabel;
        this.flagSelectedOption();
        detectChanges(this.cdr);
        this.valueChange.emit(this.model);
    };

    preWriteValue = (value: any): any => {
        return value;
    };

    postWriteValue = (): void => {
        this.selectedLabel = this.findLabelByValue(this.model);
        this.displayedLabel = this.selectedLabel;
        this.flagSelectedOption();
        detectChanges(this.cdr);
    };

    registerOnStatusChanges = (status: any): void => {
        markForCheck(this.cdr);
    };

    registerOnValueChange = (value: any): void => {
        if (this.control.value !== this.model) {
            this.control.setValue(this.model);
        }
        markForCheck(this.cdr);
    };

    shouldUpdateValidators = (changes: SimpleChanges): boolean => {
        return !!changes.required || !!changes.maxlength || !!changes.pattern || !!changes.errorMessage;
    };

    refreshInternalValidators() {
        this.requiredValidator = this.required ? Validators.required : undefined;
        this.patternValidator = !!this.pattern ? Validators.pattern(this.pattern) : undefined;
        this.maxlengthValidator = !!this.maxlength ? Validators.maxLength(this.maxlength) : undefined;
    }

    toggleDropdown() {
        if (this.control.disabled || this._readonly) {
            return;
        }
        if (!!this.optionsDropdown && this.optionsDropdown._isDisplayed) {
            this.optionsDropdown.close();
        } else {
            this.clickOnSelectInput();
        }
    }

    /**
     * click on select input should trigger paPopup toggle and display the options
     * paPopup will listen to click and close itself immediately if we dont wait for a tick
     */
    clickOnSelectInput() {
        setTimeout(() => {
            if (!!this.selectInput) {
                this.selectInput.nativeElement.click();
            }
        }, 0);
    }

    selectListOption(selectedOption: OptionModel) {
        if (!selectedOption.disabled && this.isActive()) {
            this.onValueChange(selectedOption.value);
        }
    }

    onFocus(event: FocusOrigin) {
        if (!this.optionsDisplayed && event === 'keyboard') {
            if (!this.selectedLabel) {
                this.displayedLabel = this.placeholder;
            }
            // open option dropdown
            this.clickOnSelectInput();
        }
    }

    focus() {
        if (this._hasFocus && !!this.selectInput && this.isActive()) {
            this.clickOnSelectInput();
        }
    }

    findValueByLabel(): string | null {
        if (!!this.ngContentOptions && this.ngContentOptions.length > 0) {
            const selectedComponent = this.ngContentOptions.find(
                (optionComponent) => optionComponent.text === this.selectedLabel
            );
            return selectedComponent ? selectedComponent.value : null;
        } else {
            const selectedModel = this._options.find(
                (option: OptionModel) => option.label === this.selectedLabel
            ) as OptionModel;
            return selectedModel ? selectedModel.value : null;
        }
    }

    findLabelByValue(value?: string): string | undefined {
        let label: string | undefined;
        if (!!this.ngContentOptions && this.ngContentOptions.length > 0) {
            const selectedOption = this.ngContentOptions.find((option) => option.value === this.model);
            label = !!selectedOption ? selectedOption.text : undefined;
        } else {
            const selectedOption = this._options.find((option: OptionModel) => option.value === value);
            label = !!selectedOption ? (selectedOption as OptionModel).label : undefined;
        }
        return label;
    }

    dropDownClosed() {
        this.optionsDisplayed = false;
        this.control.markAsTouched();
        this.control.markAsDirty();
        this.control.updateValueAndValidity();
        this.optionsClosed.next();
        this.expanded.emit(false);
    }

    dropDownOpened() {
        this.optionsDisplayed = true;
        if (!this.selectedLabel) {
            this.displayedLabel = this.placeholder;
            detectChanges(this.cdr);
        }
        if (!this._optionsAreNgContent) {
            setTimeout(() => {
                this.ngContentOptions?.forEach((option: OptionComponent, index) => {
                    option.selectOption.pipe(takeUntil(this.optionsClosed)).subscribe(() => {
                        this.onValueChange(option.value);
                    });
                });
            });
        }
        this.expanded.emit(true);
    }

    /**
     * browse options and update selected status
     */
    private flagSelectedOption() {
        if (!!this.ngContentOptions) {
            this.ngContentOptions.forEach((option) => {
                const isSelected = option.value === this.model;
                if (option._selected !== isSelected) {
                    option._selected = isSelected;
                    option.refresh();
                }
            });
        }
        if (!!this._options) {
            this._options
                .filter((opt) => opt.type === ControlType.option)
                .forEach((option: OptionModel) => {
                    const isSelected = option.value === this.model;
                    if (option.selected !== isSelected) {
                        option.selected = isSelected;
                    }
                });
        }
    }
}
