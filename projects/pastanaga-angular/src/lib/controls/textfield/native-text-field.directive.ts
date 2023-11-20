import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  numberAttribute,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { TextFieldUtilityService } from './text-field-utility.service';
import { Subject } from 'rxjs';
import { isVisibleInViewport, Keys, markForCheck, trimString } from '../../common';
import { sanitizeStringValue } from '../form-field.utils';
import { takeUntil } from 'rxjs/operators';
import { TextFieldDirective } from './text-field.directive';

@Directive({
  selector: '[paNativeTextField]',
})
export class NativeTextFieldDirective extends TextFieldDirective implements AfterViewInit, OnDestroy {
  @Input({ transform: numberAttribute }) maxlength?: number;
  @Input({ transform: booleanAttribute }) noAutoComplete = false;
  @Input({ transform: booleanAttribute }) showAllErrors = false;
  @Input({ transform: trimString }) placeholder = '';
  @Input({ transform: booleanAttribute }) acceptHtmlTags = false;

  @ViewChild('htmlInput') htmlInputRef?: ElementRef;

  @Output() keyUp: EventEmitter<any> = new EventEmitter();
  @Output() enter: EventEmitter<{ event: KeyboardEvent; value: any }> = new EventEmitter();
  @Output() focusing: EventEmitter<FocusEvent> = new EventEmitter();
  @Output() blurring: EventEmitter<string | number> = new EventEmitter();

  isFilled = false;
  sanitizeHtmlTags: (val: any) => any = sanitizeStringValue;

  private _stopAutoCompleteMonitor = new Subject<void>();

  constructor(
    protected override element: ElementRef,
    @Optional() @Self() protected override parentControl: NgControl,
    protected override cdr: ChangeDetectorRef,
    protected textFieldUtility: TextFieldUtilityService,
    protected renderer: Renderer2,
  ) {
    super(element, parentControl, cdr);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();

    if (this.htmlInputRef) {
      this._updateAutoComplete();
      this.textFieldUtility.handleIosCaretPosition(this.htmlInputRef.nativeElement);
      this._checkIsFilled();
    }
    this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe(() => {
      this._checkIsFilled();
      markForCheck(this.cdr);
    });
    this.control.statusChanges.pipe(takeUntil(this.terminator$)).subscribe(() => {
      this._checkDescribedBy();
      markForCheck(this.cdr);
    });
    this.setDisabledState(this.control.disabled);
    this.focusInput();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes['acceptHtmlTags']) {
      if (changes['acceptHtmlTags'].currentValue) {
        this.sanitizeHtmlTags = (val) => val;
      } else {
        this.sanitizeHtmlTags = sanitizeStringValue;
      }
    }
    if (changes['noAutoComplete']) {
      if (changes['noAutoComplete'].currentValue !== this.noAutoComplete) {
        this._updateAutoComplete();
      }
    }
  }

  override ngOnDestroy() {
    this._stopAutoCompleteMonitor.next();
    this._stopAutoCompleteMonitor.complete();
    super.ngOnDestroy();
  }

  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    if (this.htmlInputRef) {
      this.renderer.setProperty(this.htmlInputRef?.nativeElement, 'disabled', isDisabled);
    }
  }

  override onFocus(event: any) {
    super.onFocus(event);
    this.onTouched();

    if (this.isActive) {
      this.focusing.emit(event);
    }
  }

  override onBlur() {
    super.onBlur();

    // if the fromControl uses { updateOn: 'blur' } or { updateOn: 'submit' }
    // we emit the element value as this.control.value might not be updated yet
    const value = this.control.updateOn !== 'change' ? this.htmlInputRef?.nativeElement?.value : this.control.value;
    this.blurring.emit(value);
    this._checkIsFilled();
    if (this.control.updateOn !== 'change') {
      this.control.markAsTouched();
      // with updateOn 'blur' strategy, the first change might not triggered within this cycle
      // and therefore, potential validation errors may not be displayed
      if (this.control.pristine && (this.control.value || value) && this.control.value !== value) {
        this.control.markAsDirty();
      }
      this.control.setValue(value);
      this.control.updateValueAndValidity({ emitEvent: true });
    }
  }

  onKeyUp(event: any) {
    // we emit the element value as this.control.value might not be updated yet
    // if the fromControl uses { updateOn: 'blur' } or  { updateOn: 'submit' }
    if (this.isActive && event.key !== Keys.tab && !!event.target) {
      this.keyUp.emit(this.htmlInputRef?.nativeElement?.value);

      if (event.key === Keys.enter) {
        this.enter.emit({ event, value: this.htmlInputRef?.nativeElement?.value });
      }
    }
  }

  override focusInput() {
    if (this.hasFocus && !!this.htmlInputRef && this.isActive) {
      this.htmlInputRef.nativeElement.focus();
      if (!isVisibleInViewport(this.htmlInputRef.nativeElement)) {
        this.htmlInputRef.nativeElement.scrollIntoView();
      }
    }
  }

  private _updateAutoComplete() {
    if (!this.noAutoComplete) {
      this.textFieldUtility.handleBrowserAutoFill(
        this.htmlInputRef?.nativeElement,
        this.control,
        this._stopAutoCompleteMonitor,
      );
    } else {
      this._stopAutoCompleteMonitor.next();
    }
  }

  protected _checkIsFilled() {
    // NB: depending on updateOn formHook, the input can be filled but the formControlValue not updated yet
    const value = this.control.value || this.htmlInputRef?.nativeElement.value;
    this.isFilled = !!value || value === 0;
  }
}
