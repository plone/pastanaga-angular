import { FocusOrigin } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  inject,
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
import { NgControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { detectChanges, isVisibleInViewport, markForCheck, trimString } from '../../../common';
import { DropdownComponent, OptionComponent } from '../../../dropdown';
import { ControlType, OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';
import { TextFieldDirective } from '../text-field.directive';

export type OptionType = OptionModel | OptionSeparator | OptionHeaderModel;

@Component({
  selector: 'pa-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SelectComponent extends TextFieldDirective implements OnChanges, AfterViewInit, OnDestroy {
  @Input({ transform: trimString }) label = '';
  @Input({ transform: trimString }) placeholder = '';
  @Input({ transform: booleanAttribute }) adjustHeight = false;
  @Input({ transform: booleanAttribute }) showAllErrors = false;
  @Input({ transform: booleanAttribute }) dim = false;
  @Input({ transform: booleanAttribute }) multiple = false;

  @Input() set options(values: OptionType[] | null) {
    this.dropdownOptions = !!values ? values : [];
    if (values) {
      this._initDisplayAndSelection();
    } else {
      this._updateDisplayedValue(this.control.value);
    }
  }

  @Output() expanded: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('selectInput') selectInput?: ElementRef;
  @ViewChild('optionsDropdown') optionsDropdown?: DropdownComponent;
  @ContentChildren(OptionComponent, { descendants: true }) ngContent?: QueryList<OptionComponent>;

  get hasValue() {
    return !!this.control.value;
  }

  mouseDown = false;

  dropdownOptions: OptionType[] = [];
  selectedOption?: OptionModel;
  isOpened = false;
  override fieldType = 'select';

  private selectedOptions: OptionModel[] = [];

  /**
   * either the selected option label, either the placeholder
   */
  displayedValue?: string;
  private optionsClosed$ = new Subject<void>();
  private contentOptionsChanged$ = new Subject<void>();

  protected _terminator = new Subject<void>();
  protected platform: Platform = inject(Platform);

  constructor(
    protected override element: ElementRef,
    @Optional() @Self() protected override parentControl: NgControl,
    public override cdr: ChangeDetectorRef,
  ) {
    super(element, parentControl, cdr);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this._checkDescribedBy();
    if (this.selectInput) {
      fromEvent(this.selectInput.nativeElement, 'blur')
        .pipe(delay(0), takeUntil(this.terminator$))
        .subscribe(() => {
          if (this.isOpened) {
            this.optionsClosed$.next();
            this.isOpened = false;
            this.expanded.emit(false);
          }
        });
    }
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    this._handleNgContent();
    this._checkDescribedBy();
    this.focusInput();
    this._initDisplayAndSelection();

    // valueChanges may be triggered by an update value and validity...
    // we don't want to recompute the displayed option label in that case
    this.control.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.terminator$)).subscribe((val) => {
      if (!this.multiple) {
        this._updateDisplayedValue(val);
        this._markOptionAsSelected();
        detectChanges(this.cdr);
      } else {
        this._updateDisplayMultipleValues(val);
      }
    });
    this.control.statusChanges
      .pipe(distinctUntilChanged(), takeUntil(this.terminator$))
      .subscribe(() => markForCheck(this.cdr));
  }

  override ngOnDestroy() {
    this.optionsClosed$.next();
    this.optionsClosed$.complete();
    this.contentOptionsChanged$.complete();
    this._terminator.next();
    this._terminator.complete();
    super.ngOnDestroy();
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
      this.optionsDropdown?.close();
      this.isOpened = false;
      this.cdr.detectChanges();
    }
  }

  selectMultipleOptions(option: OptionModel) {
    if (!option.disabled && this.isActive) {
      if (!option.selected) {
        option.selected = true;
        this.selectedOptions.push(option);
      } else {
        option.selected = false;
        const index = this.selectedOptions.findIndex((selectedOption) => selectedOption.id === option.id);
        if (index >= 0) {
          this.selectedOptions.splice(index, 1);
        }
      }
      const value = this.selectedOptions.map((option) => option.value).join(',');
      this.control.patchValue(value);
      this.cdr.detectChanges();
    }
  }

  override focusInput() {
    if (this.hasFocus && this.isActive) {
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

  private _initDisplayAndSelection() {
    if (this.multiple) {
      this._updateDisplayMultipleValues(this.control.value);
      if (this.control.value) {
        this._initSelectedOptionsForMultipleValue();
        this._markOptionAsSelected();
      }
    } else {
      this._updateDisplayedValue(this.control.value);
    }
  }

  protected _updateDisplayedValue(val?: string) {
    const selectedOptionLabel = this._findLabelByValue(val);
    this.displayedValue = selectedOptionLabel || this.placeholder;
    detectChanges(this.cdr);
  }

  private _updateDisplayMultipleValues(val?: string) {
    const values = val?.split(',') || [];
    const labels = values.map((value) => this._findLabelByValue(value)).join(', ');
    this.displayedValue = labels || this.placeholder;
    detectChanges(this.cdr);
  }

  private _initSelectedOptionsForMultipleValue() {
    const selectedValues = this.control.value.split(',');
    (this.dropdownOptions || []).forEach((dropdownOption) => {
      if (dropdownOption.type === ControlType.option) {
        const option = dropdownOption as OptionModel;
        if (selectedValues.includes(option.value)) {
          this.selectedOptions.push(option);
        }
      }
    });
  }

  private _findLabelByValue(value?: string): string | undefined {
    let label: string | undefined;

    // precedence of drop options provided in input over options provided as ngContent
    if (this.dropdownOptions.length) {
      const selectedOption = this.dropdownOptions.find((option) => (option as OptionModel).value === value);
      label = !!selectedOption ? (selectedOption as OptionModel).label : undefined;
      this.selectedOption = selectedOption instanceof OptionModel ? selectedOption : undefined;
    }
    if (!label && !!this.ngContent && this.ngContent.length) {
      const selectedOption = this.ngContent.find((option) => option.value === this.control.value);
      label = !!selectedOption ? selectedOption.text : undefined;
    }
    return label;
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
    if (this.dropdownOptions.length) {
      this.dropdownOptions.forEach((option: OptionType) => {
        if (option.type === ControlType.option) {
          this._toggleSelectedOption(option as OptionModel);
        }
      });
      // refresh array reference to trigger change detection in child component
      this.dropdownOptions = this.dropdownOptions.slice();
    }
    if (!!this.ngContent) {
      this.ngContent.toArray().forEach((option) => this._toggleSelectedOption(option));
    }
  }

  private _toggleSelectedOption(option: OptionComponent | OptionModel) {
    if (this.multiple) {
      const selectedValues = this.control.value.split(',');
      if (option.selected && !selectedValues.includes(option.value)) {
        option.selected = false;
      } else if (!option.selected && selectedValues.includes(option.value)) {
        option.selected = true;
      }
    } else {
      if (option.selected && option.value !== this.control.value) {
        option.selected = false;
      } else if (!option.selected && option.value === this.control.value) {
        option.selected = true;
      }
    }
  }

  onMouseDown() {
    this.mouseDown = true;
  }

  onMouseUp() {
    this.mouseDown = false;
  }
}
