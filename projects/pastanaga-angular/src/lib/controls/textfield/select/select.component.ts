import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { ControlType, OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';
import { OptionComponent } from '../../../dropdown/option/option.component';
import { DropdownComponent } from '../../../dropdown/dropdown.component';
import { debounce, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import { detectChanges, isVisibleInViewport, markForCheck, PositionStyle } from '../../../common';
import { fromEvent, interval, Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusOrigin } from '@angular/cdk/a11y';
import { PaFormControlDirective } from '../../form-field/pa-form-control.directive';
import { IErrorMessages } from '../../form-field.model';
import { WINDOW } from '@ng-web-apis/common';

@Component({
    selector: 'pa-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends PaFormControlDirective implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    @Input() label = '';
    @Input() placeholder?: string;

    @Input() set options(values: (OptionModel | OptionSeparator | OptionHeaderModel)[]) {
        this.dropDownModels = !!values ? values : [];
        this._updateDisplayedValue(this.control.value);
    }

    @Input() set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
        this._focusInput();
    }

    @Input() adjustHeight = false;
    @Input() help?: string;
    @Input() errorMessages?: IErrorMessages;
    @Input() showAllErrors = true;
    @Input() set dim(value: boolean) {
        this._dim = coerceBooleanProperty(value);
    }
    get dim() {
        return this._dim;
    }

    @Input() optionsPosition?: PositionStyle;

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
    dropdownPosition: PositionStyle = {};

    private optionsClosed$ = new Subject();
    private contentOptionsChanged$ = new Subject();
    private _hasFocus = false;
    private _dim = false;

    protected _terminator = new Subject();

    constructor(
        protected element: ElementRef,
        @Optional() @Self() protected parentControl: NgControl,
        protected platform: Platform,
        public cdr: ChangeDetectorRef,
        @Inject(WINDOW) private window: any,
        private _ngZone: NgZone,
    ) {
        super(element, parentControl, cdr);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        this._checkDescribedBy();
    }

    ngAfterViewInit(): void {
        this.updateDropdownPositionOnSroll();
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
        this._terminator.next();
        this._terminator.complete();
        super.ngOnDestroy();
    }

    updateDropdownPositionOnSroll() {
        this._ngZone.runOutsideAngular(() => {
            fromEvent(this.window, 'scroll')
                .pipe(
                    filter(() => this.isOpened),
                    debounce(() => interval(50)),
                    tap(() => this.updateDropdownPosition()),
                    takeUntil(this._terminator),
                )
                .subscribe();
        });
    }

    updateDropdownPosition() {
        const rect = this.selectInput?.nativeElement.getBoundingClientRect();
        let containerTranslateY = 0;
        const containerTransformedOffsetTop = this.window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--containerTranslateY');

        if (containerTransformedOffsetTop) {
            containerTranslateY = parseInt(containerTransformedOffsetTop, 10);
        }

        this.dropdownPosition = {
            position: 'fixed',
            width: `${this.selectInput?.nativeElement.offsetWidth}px`,
            top: `${rect.bottom - containerTranslateY}px`,
        };
        detectChanges(this.cdr);
    }

    toggleDropdown() {
        if (this.control.disabled || this.readonly) {
            return;
        }
        if (!!this.optionsDropdown && this.optionsDropdown.isDisplayed) {
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
            if (!isVisibleInViewport(this.selectInput?.nativeElement)) {
                this.selectInput?.nativeElement.scrollIntoView();
            }
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
        detectChanges(this.cdr);
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
                option.selectOption.pipe(takeUntil(this.terminator$)).subscribe(() => this.selectOption(option)),
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
