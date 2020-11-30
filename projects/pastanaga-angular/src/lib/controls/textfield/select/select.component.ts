import {
    Component,
    ChangeDetectionStrategy,
    Optional,
    Self,
    NgZone,
    ChangeDetectorRef,
    SimpleChanges,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit,
    QueryList,
    ContentChildren,
    OnDestroy,
    OnChanges,
} from '@angular/core';
import { BaseControl } from '../../base-control';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { ControlType, OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';
import { OptionComponent } from '../../../dropdown/option/option.component';
import { DropdownComponent } from '../../../dropdown/dropdown.component';
import { takeUntil } from 'rxjs/operators';
import { detectChanges, markForCheck } from '../../../common';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { sanitizeStringValue } from '../../form-field.utils';
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

    @Input() suggestionMode = false;

    @Input() set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }
    get required() {
        return this._required || false;
    }

    @Input() pattern?: RegExp | string;

    @Input() maxlength?: number;

    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @Output() expanded: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('selectInput') selectInput?: ElementRef;
    @ViewChild('optionsDropdown') optionsDropdown?: DropdownComponent;
    @ContentChildren(OptionComponent, { descendants: true }) ngContentOptions?: QueryList<OptionComponent>;

    readonly acceptHtmlTags = false;

    _options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    displayedValue?: string | number;
    optionsClosed = new Subject();
    _optionsAreNgContent = true;
    _required?: boolean;
    optionsDisplayed = false;

    requiredValidator?: ValidatorFn;
    patternValidator?: ValidatorFn;
    maxlengthValidator?: ValidatorFn;

    constructor(
        @Optional() @Self() public parentControl: NgControl,
        protected platform: Platform,
        protected ngZone: NgZone,
        public cdr: ChangeDetectorRef,
        protected autofillMonitor: AutofillMonitor
    ) {
        super(parentControl, cdr);
        this._fieldKind = 'select';
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.shouldUpdateValidators(changes)) {
            this.refreshInternalValidators();
        }
        super.ngOnChanges(changes);
    }

    ngAfterViewInit(): void {
        this.handleIosCaretPosition();
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
        this.displayedValue = this.findLabelByValue(this.model);
        this.flagSelectedOption();
        detectChanges(this.cdr);
        this.valueChange.emit(this.model);
    };

    preWriteValue = (value: any): any => {
        return value;
    };

    postWriteValue = (): void => {
        this.displayedValue = this.findLabelByValue(this.model);
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

    filterOptions(optionLabel?: string | number) {
        if (this.control.pristine) {
            return;
        }
        this.hideIrrelevantOptions(`${optionLabel}`.toLocaleLowerCase());
    }

    hideIrrelevantOptions(displayedValue: any) {
        if (!!this.ngContentOptions && this.ngContentOptions.length > 0) {
            this.ngContentOptions.forEach((option) => {
                option._hidden = !option.text.toLocaleLowerCase().includes(displayedValue);
                option.refresh();
            });
            markForCheck(this.cdr);
        }
    }

    selectInputChanged(optionLabel?: string | number) {
        this.control.markAsDirty();
        this.filterOptions(optionLabel);
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

    onBlur() {
        this.applyUserInput();
    }

    onFocus(event: FocusOrigin) {
        if (!this.optionsDisplayed && event === 'keyboard') {
            // open option dropdown
            this.clickOnSelectInput();
        }
    }

    onEnter() {
        if (!!this.optionsDropdown && this.optionsDropdown._isDisplayed) {
            this.optionsDropdown.close();
        }
        if (!!this.selectInput) {
            this.selectInput.nativeElement.blur();
        }
    }

    applyUserInput() {
        if (!this.isActive()) {
            return;
        }
        const optionValueForUserInput = this.findValueByLabel();
        if (!!optionValueForUserInput) {
            this.onValueChange(optionValueForUserInput);
        } else if (this.suggestionMode) {
            const sanitized = sanitizeStringValue(this.displayedValue, this.acceptHtmlTags);
            this.onValueChange(sanitized);
        } else if (!!this.model) {
            this.displayedValue = this.findLabelByValue(this.model);
        }
    }

    focus() {
        if (this._hasFocus && !!this.selectInput && this.isActive()) {
            this.clickOnSelectInput();
        }
    }

    private handleIosCaretPosition() {
        if (this.platform.IOS && !!this.selectInput) {
            const input = this.selectInput;
            this.ngZone.runOutsideAngular(() => {
                input.nativeElement.addEventListener('keyup', (event: Event) => {
                    const element = event.target as HTMLInputElement;
                    if (!element.value && !element.selectionStart && !element.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        element.setSelectionRange(1, 1);
                        element.setSelectionRange(0, 0);
                    }
                });
            });
        }
    }

    findValueByLabel(): string | null {
        if (!!this.ngContentOptions && this.ngContentOptions.length > 0) {
            const selectedComponent = this.ngContentOptions.find(
                (optionComponent) => optionComponent.text === this.displayedValue
            );
            return selectedComponent ? selectedComponent.value : null;
        } else {
            const selectedModel = this._options.find(
                (option: OptionModel) => option.label === this.displayedValue
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
        if (!label && this.suggestionMode) {
            label = value;
        }
        return label;
    }

    dropDownClosed() {
        this.optionsDisplayed = false;
        this.optionsClosed.next();
        this.expanded.emit(false);
    }

    dropDownOpened() {
        this.optionsDisplayed = true;
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
