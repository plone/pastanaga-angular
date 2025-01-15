import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'pa-demo-slider-page',
  templateUrl: './slider-page.component.html',
  styles: [
    `
      .slider-line {
        display: flex;
        align-items: flex-start;
        gap: 40px;

        :first-child {
          width: 400px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SliderPageComponent {
  ngModelCode = `<pa-slider
  [(ngModel)]="model2"
  [disabled]="disable"
  min="5"
  max="150"
  step="5"
  help="Help: step is set to 5 on this one">
  Label
</pa-slider>`;
  formControlCode = `<pa-slider
  [formControl]="control">
  Label
</pa-slider>`;
  formGroupCode = `<form [formGroup]="group">
  <pa-slider
    formControlName="percent">
    Percent
  </pa-slider>
  <pa-slider
    id="total"
    formControlName="total">
    Total
  </pa-slider>
</form>`;

  value = 5;
  model = 25;
  model2 = 25;
  control = new FormControl<number>(75);
  group = new FormGroup({
    percent: new FormControl<number>(15),
    total: new FormControl<number>(43),
  });
  disable = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleDisable() {
    this.disable = !this.disable;
    if (this.disable) {
      this.control.disable();
      this.group.disable();
    } else {
      this.control.enable();
      this.group.enable();
    }
    this.cdr.markForCheck();
  }
}
