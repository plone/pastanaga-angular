import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  numberAttribute,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { TextInputType } from '../../form-field.model';
import { TextFieldUtilityService } from '../text-field-utility.service';
import { NativeTextFieldDirective } from '../native-text-field.directive';
import { sanitizeNumberValue } from '../../form-field.utils';
import { trimString } from '../../../common';

@Component({
  selector: 'pa-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputComponent extends NativeTextFieldDirective implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input()
  set type(value: TextInputType | undefined | null) {
    this._type = value || 'text';
    this._updateInputType();
  }
  get type() {
    return this._type;
  }

  @Input({ transform: trimString }) icon = '';
  @Input({ transform: numberAttribute }) min?: number;
  @Input({ transform: numberAttribute }) max?: number;
  @Input({ transform: numberAttribute }) step?: number;
  @Input({ transform: booleanAttribute }) iconOnRight = false;
  @Input({ transform: trimString }) autocapitalize = '';

  override fieldType = 'input';

  private _type: TextInputType = 'text';
  private _wasNumber = false;

  constructor(
    override element: ElementRef,
    @Optional() @Self() protected override parentControl: NgControl,
    protected override cdr: ChangeDetectorRef,
    protected override textFieldUtility: TextFieldUtilityService,
    protected override renderer: Renderer2,
  ) {
    super(element, parentControl, cdr, textFieldUtility, renderer);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this._checkIsFilled();
    this._checkDescribedBy();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngAfterViewInit(): void {
    this._updateInputType();
    super.ngAfterViewInit();
  }

  override ngOnDestroy() {
    this._unTrackNumberInputClick();
    super.ngOnDestroy();
  }

  private _updateInputType() {
    // When using Angular inputs, developers are no longer able to set the properties on the native
    // input element. To ensure that bindings for `type` work, we need to sync the setter
    // with the native property.
    if (!!this.htmlInputRef) {
      this.htmlInputRef.nativeElement.type = this._type;
    }
    this._checkNumberInputEvent();
  }

  private _checkNumberInputEvent() {
    if (!!this.htmlInputRef && this._type === 'number') {
      this._wasNumber = true;
      this.htmlInputRef.nativeElement.addEventListener('mouseup', this._numberInputClicked);
      this.sanitizeHtmlTags = sanitizeNumberValue;
    } else {
      this._unTrackNumberInputClick();
    }
  }

  private _numberInputClicked = () => {
    if (this.control.untouched) {
      this.control.markAsTouched();
    }
    if (this.control.pristine) {
      this.control.markAsDirty();
    }
    if (this.htmlInputRef?.nativeElement.value !== this.control.value) {
      const val = Number(this.htmlInputRef?.nativeElement.value);
      this.control.patchValue(isNaN(val) ? null : val);
    }
  };

  private _unTrackNumberInputClick() {
    if (!!this.htmlInputRef && this._wasNumber) {
      this.htmlInputRef.nativeElement.removeEventListener('mouseup', this._numberInputClicked);
    }
  }
}
