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
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { detectChanges, markForCheck } from '../../../common';
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
        this.dropDownModels = !!values ? values : [];
    }

    @Input() set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
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
    @ContentChildren(OptionComponent, { descendants: true }) ngContent?: QueryList<OptionComponent>;

    get hasValue() {
        return !!this.control.value;
    }

    dropDownModels: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    isOpened = false;
    fieldType = 'select';
    describedById?: string;
    /**
     * either the selected option label, either the placeholder
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
        // valueChanges may be triggered by an update value and validity...
        // we don't want to recompute the displayed option label in that case
        this.control.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.terminator$)).subscribe((val) => {
            this._updateDisplayedValue(val);
            this._markOptionAsSelected();
            detectChanges(this.cdr);
        });
        this.control.statusChanges
            .pipe(distinctUntilChanged(), takeUntil(this.terminator$))
            .subscribe(() => markForCheck(this.cdr));
    }

    ngOnDestroy() {
        this.optionsClosed$.next();
        this.optionsClosed$.complete();
        this.contentOptionsChanged$.complete();
        super.ngOnDestroy();
    }

    toggleDropdown() {
        if (this.control.disabled || this.readonly) {
            return;
        }
        if (!!this.optionsDropdown && this.optionsDropdown._isDisplayed) {
            // will trigger onClose event
            this.optionsDropdown.close();
        } else {
            this._openOptionDropDown();
        }
    }

    dropDownOpened() {
        this.isOpened = true;
        this.expanded.emit(true);
    }

    dropDownClosed() {
        if (!this.control.touched) {
            this.control.markAsTouched({});
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

    onControlFocused(event: FocusOrigin) {
        if (!this.isOpened && event === 'keyboard') {
            this._openOptionDropDown();
        }
    }

    selectOption(option: OptionModel | OptionComponent) {
        if (!option.disabled && this.isActive && option.value !== this.control.value) {
            this.control.patchValue(option.value);
        }
    }

    private _focusInput() {
        if (this._hasFocus && this.isActive) {
            this._openOptionDropDown();
        }
    }

    /**
     * click on select input triggers paPopup toggle and display the options.
     * paPopup will listen to click and close itself immediately if we dont wait for a tick
     */
    private _openOptionDropDown() {
        setTimeout(() => {
            if (!!this.selectInput) {
                this.selectInput.nativeElement.click();
            }
        });
    }

    private _updateDisplayedValue(val?: string) {
        const selectedOptionLabel = this._findLabelByValue(val);
        this.displayedValue = selectedOptionLabel || this.placeholder;
    }

    private _findLabelByValue(value?: string): string | undefined {
        let label: string | undefined;

        // precedence of drop options provided in input over options provided as ngContent
        if (this.dropDownModels.length) {
            const selectedOption = this.dropDownModels.find((option: OptionModel) => option.value === value);
            label = !!selectedOption ? (selectedOption as OptionModel).label : undefined;
        }
        if (!label && !!this.ngContent && this.ngContent.length) {
            const selectedOption = this.ngContent.find((option) => option.value === this.control.value);
            label = !!selectedOption ? selectedOption.text : undefined;
        }
        return label;
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

    private _handleNgContent() {
        this._markOptionAsSelected();
        this._trackNgContentOptionSelected();

        if (!!this.ngContent) {
            this.ngContent.changes.pipe(takeUntil(this.terminator$)).subscribe(() => {
                this.contentOptionsChanged$.next();
                this._markOptionAsSelected();
                this._trackNgContentOptionSelected();
            });
        }
    }

    private _trackNgContentOptionSelected() {
        if (!!this.ngContent) {
            // subscribe to option selection
            this.ngContent.forEach((option) =>
                option.selectOption.pipe(takeUntil(this.terminator$)).subscribe(() => this.selectOption(option))
            );
        }
    }

    private _markOptionAsSelected() {
        if (this.dropDownModels.length) {
            this.dropDownModels.forEach((option: OptionModel | OptionSeparator | OptionHeaderModel) => {
                if (option.type === ControlType.option) {
                    this._toggleSelectedOption(option as OptionModel);
                }
            });
            // refresh array reference to trigger change detection in child component
            this.dropDownModels = this.dropDownModels.slice();
        }
        if (!!this.ngContent) {
            this.ngContent.toArray().forEach((option) => this._toggleSelectedOption(option));
        }
    }

    private _toggleSelectedOption(option: OptionComponent | OptionModel) {
        if (option.selected && option.value !== this.control.value) {
            option.selected = false;
        } else if (!option.selected && option.value === this.control.value) {
            option.selected = true;
        }
    }
}
