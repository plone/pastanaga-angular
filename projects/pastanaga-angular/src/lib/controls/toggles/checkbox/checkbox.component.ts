import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { PaFormControlDirective } from '../../form-field';
import { takeUntil } from 'rxjs/operators';
import { detectChanges } from '../../../common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'pa-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends PaFormControlDirective implements OnChanges, AfterViewInit {
  @Input()
  set noEllipsis(value: any) {
    this._noEllipsis = coerceBooleanProperty(value);
  }
  get noEllipsis() {
    return this._noEllipsis;
  }

  @ViewChild('htmlElement') htmlElementRef?: ElementRef;

  override fieldType = 'checkbox';
  isChecked = false;

  private _noEllipsis = false;

  constructor(
    protected override element: ElementRef,
    @Optional() @Self() protected override parentControl: NgControl,
    protected override cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {
    super(element, parentControl, cdr);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  ngAfterViewInit() {
    this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe((val) => {
      this.isChecked = val;
      detectChanges(this.cdr);
    });
    this.control.statusChanges.pipe(takeUntil(this.terminator$)).subscribe((status) => {
      this.describedById = status === 'INVALID' ? `${this.id}-hint` : undefined;
      detectChanges(this.cdr);
    });
  }

  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    if (this.htmlElementRef) {
      this.renderer.setProperty(this.htmlElementRef?.nativeElement, 'disabled', isDisabled);
    }
  }
}
