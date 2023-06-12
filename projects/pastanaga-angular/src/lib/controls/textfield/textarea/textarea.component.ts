import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { TextFieldUtilityService } from '../text-field-utility.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NativeTextFieldDirective } from '../native-text-field.directive';
import { cssAsNumber } from '../../../common';

@Component({
  selector: 'pa-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent extends NativeTextFieldDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input()
  get resizable(): boolean {
    return this._resizable;
  }

  set resizable(value: any) {
    this._resizable = coerceBooleanProperty(value);
  }

  @Input()
  set rows(value: number) {
    this._rows = value;
    this._defaultRows = value;
  }

  get rows() {
    return this._rows;
  }

  @Input()
  get autoHeight(): boolean {
    return this._autoHeight;
  }

  set autoHeight(value: any) {
    this._autoHeight = coerceBooleanProperty(value);
  }

  @Input() set maxRows(max: number) {
    this._maxRows = max;
    if (!!max && !this._maxHeight) {
      this._computeMaxHeight();
    } else if (!max && !this.maxHeight) {
      this.autoMaxHeight = null;
    }
  }

  private _maxRows?: number;

  @Input() set maxHeight(max: number | undefined) {
    // maxHeight can be set internally using maxRows
    // therefore we need to apply the change only when there's an actual change
    this._maxHeight = max;
    if (!!this._maxHeight) {
      this.autoMaxHeight = max;
    } else if (!this._maxRows) {
      this.autoMaxHeight = null;
    } else {
      this._computeMaxHeight();
    }
  }

  get maxHeight() {
    return this._maxHeight;
  }

  private _maxHeight?: number;
  autoMaxHeight: number | null | undefined = null;
  override fieldType = 'textarea';

  private _resizable = true;
  private _rows = 1;
  private _defaultRows = 1;

  private _autoHeight = false;
  private _lineHeight = 0;
  private _verticalPadding = 0;

  constructor(
    protected override element: ElementRef,
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

  override ngAfterViewInit() {
    this._computeMaxHeight();
    super.ngAfterViewInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    if (this.htmlInputRef) {
      this.renderer.setProperty(this.htmlInputRef?.nativeElement, 'disabled', isDisabled);
    }
  }

  _computeMaxHeight() {
    if (!this._maxHeight && this.htmlInputRef) {
      if (!this._lineHeight) {
        this._cacheElementStyle();
      }
      if (this._maxRows && this._lineHeight) {
        this.autoMaxHeight = this._maxRows * this._lineHeight + this._verticalPadding;
      }
    }
  }

  private _cacheElementStyle() {
    const style = window.getComputedStyle(this.htmlInputRef?.nativeElement);
    this._lineHeight = cssAsNumber(style.lineHeight);
    this._verticalPadding = cssAsNumber(style.paddingTop) + cssAsNumber(style.paddingBottom);
  }
}
