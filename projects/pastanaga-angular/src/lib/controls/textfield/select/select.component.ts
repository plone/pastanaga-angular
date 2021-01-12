import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { ControlType, OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';
import { OptionComponent } from '../../../dropdown/option/option.component';
import { DropdownComponent } from '../../../dropdown/dropdown.component';
import { takeUntil } from 'rxjs/operators';
import { detectChanges } from '../../../common';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusOrigin } from '@angular/cdk/a11y';
import { PaFormControlDirective } from '../../form-field/pa-form-control.directive';
import { IErrorMessages } from '../../form-field.model';

@Component({
    selector: 'pa-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends PaFormControlDirective implements OnChanges, AfterViewInit, OnDestroy {
    @Input() label = '';
    @Input() placeholder?: string;

    @Input() set options(values: (OptionModel | OptionSeparator | OptionHeaderModel)[]) {
        this.optionModels = values;
        // find provided selected option
        const selectedOption: OptionModel | undefined = values.find(
            (option) => option.type === ControlType.option && (option as OptionModel).selected
        ) as OptionModel | undefined;
        if (selectedOption) {
            this.control.patchValue(selectedOption.value);
        }
    }

    @Input() set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    get required() {
        return this._required || false;
    }

    @Input() set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
        this._focusInput();
    }

    @Input() adjustHeight = false;
    @Input() help?: string;
    @Input() errorMessages?: IErrorMessages;
    @Input() showAllErrors = true;

    @Output() expanded: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('selectInput') selectInput?: ElementRef;
    @ViewChild('optionsDropdown') optionsDropdown?: DropdownComponent;
    @ContentChildren(OptionComponent, { descendants: true }) ngContentOptions?: QueryList<OptionComponent>;

    get hasValue() {
        // TODO: question this condition
        return !!this.control.value && this.control.value.length;
    }

    optionModels: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    isOpened = false;
    fieldType = 'select';
    describedById?: string;
    /**
     * either the label of the selected option, either the placeholder
     */
    displayedValue?: string;
    private optionsClosed$ = new Subject();
    private contentOptionsChanged$ = new Subject();
    private _required?: boolean;
    private _hasFocus = false;

    constructor(
        protected element: ElementRef,
        @Optional() @Self() protected parentControl: NgControl,
        protected platform: Platform,
        public cdr: ChangeDetectorRef
    ) {
        super(element, parentControl, cdr);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        this._checkDescribedBy();
        if (changes.required) {
            if (changes.required.currentValue) {
                this.internalValidatorsMap.set('required', Validators.required);
            } else {
                this.internalValidatorsMap.delete('required');
            }
            this.validatorChanged$.next();
        }
    }

    ngAfterViewInit(): void {
        this._handleNgContent();
        this._checkDescribedBy();
        this._focusInput();
        this._updateDisplayedValue(this.control.value);
        this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe((val) => {
            this._updateDisplayedValue(val);
        });
    }

    ngOnDestroy() {
        this.optionsClosed$.next();
        this.optionsClosed$.complete();
        this.contentOptionsChanged$.complete();
        super.ngOnDestroy();
    }

    _handleNgContent() {
        if (!!this.ngContentOptions) {
            this._trackOptionSelected();
            this.ngContentOptions.changes.pipe(takeUntil(this.terminator$)).subscribe(() => {
                this.contentOptionsChanged$.next();
                this._trackOptionSelected();
            });
        }
    }
    _trackOptionSelected() {
        if (this.ngContentOptions && this.ngContentOptions.length > 0) {
            // subscribe to option selection
            this.ngContentOptions.forEach((option) =>
                option.selectOption.pipe(takeUntil(this.terminator$)).subscribe(() => {
                    this.control.patchValue(option.value);
                })
            );
        }
    }

    toggleDropdown() {
        if (this.control.disabled || this.readonly) {
            return;
        }
        if (!!this.optionsDropdown && this.optionsDropdown._isDisplayed) {
            this.optionsDropdown.close();
        } else {
            this.openOptionDropDown();
        }
    }

    /**
     * click on select input triggers paPopup toggle and display the options
     * paPopup will listen to click and close itself immediately if we dont wait for a tick
     */
    openOptionDropDown() {
        setTimeout(() => {
            if (!!this.selectInput) {
                this.selectInput.nativeElement.click();
            }
        });
    }

    optionSelected(selectedOption: OptionModel) {
        if (!selectedOption.disabled && this.isActive) {
            this.control.patchValue(selectedOption.value);
        }
    }

    onFocus(event: FocusOrigin) {
        if (!this.isOpened && event === 'keyboard') {
            this.openOptionDropDown();
        }
    }

    private _focusInput() {
        if (this._hasFocus && !!this.selectInput && this.isActive) {
            this.openOptionDropDown();
        }
    }

    _updateDisplayedValue(val?: string) {
        const selectedOptionLabel = this._findLabelByValue(val);
        this.displayedValue = selectedOptionLabel || this.placeholder;
        detectChanges(this.cdr);
    }

    private _findLabelByValue(value?: string): string | undefined {
        let label: string | undefined;
        if (!!this.ngContentOptions && this.ngContentOptions.length > 0) {
            const selectedOption = this.ngContentOptions.find((option) => option.value === this.control.value);
            label = !!selectedOption ? selectedOption.text : undefined;
        } else {
            const selectedOption = this.optionModels.find((option: OptionModel) => option.value === value);
            label = !!selectedOption ? (selectedOption as OptionModel).label : undefined;
        }
        return label;
    }

    dropDownClosed() {
        if (!this.control.touched) {
            this.control.markAsTouched();
        }
        // if user opened the dropdown but did not select a value
        // we consider this as an action leading to formControl validation
        if (this.control.pristine) {
            this.control.markAsDirty();
            this.control.updateValueAndValidity();
        }

        this.optionsClosed$.next();
        this.isOpened = false;
        this.expanded.emit(false);
    }

    dropDownOpened() {
        this.isOpened = true;
        if (!this.optionModels.length) {
            setTimeout(() => {
                this.ngContentOptions?.forEach((option: OptionComponent) => {
                    option.selectOption.pipe(takeUntil(this.optionsClosed$)).subscribe(() => {
                        this.writeValue(option.value);
                    });
                });
            });
        }
        this.expanded.emit(true);
    }

    private _checkDescribedBy() {
        if ((!this.describedById && this.help) || this.control.errors) {
            this.describedById = `${this.id}-hint`;
            detectChanges(this.cdr);
        } else if (!this.help && !this.control.errors) {
            this.describedById = undefined;
            detectChanges(this.cdr);
        }
    }
}
