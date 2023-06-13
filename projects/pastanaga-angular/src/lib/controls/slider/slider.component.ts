import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PaFormControlDirective } from '../form-field';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'pa-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent extends PaFormControlDirective implements AfterViewInit, OnInit {
  @Input()
  set min(value: any) {
    this._min = coerceNumberProperty(value);
  }
  get min(): number {
    return this._min;
  }

  @Input()
  set max(value: any) {
    this._max = coerceNumberProperty(value);
  }
  get max(): number {
    return this._max;
  }

  @Input()
  set step(value: any) {
    this._step = coerceNumberProperty(value);
  }
  get step(): number {
    return this._step;
  }

  get outputMinWidth() {
    return `${(this.max.toString().length + 1.5) * 8}px`;
  }

  @ViewChild('label', { read: ElementRef }) label?: ElementRef;
  hasLabel = false;

  private _min = 0;
  private _max = 100;
  private _step = 1;

  ngAfterViewInit(): void {
    this.hasLabel = !!this.label && this.label.nativeElement.textContent.length > 0;
    this.cdr.markForCheck();
  }

  override ngOnInit() {
    super.ngOnInit();
    // Set value as the minimum one by default
    if (!this.control.value) {
      this.control.patchValue(this.min);
    }
  }
}
