import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { PaFormControlDirective, detectChanges } from '@guillotinaweb/pastanaga-angular';

@Component({
  selector: 'pa-demo-form-control-state-example',
  templateUrl: './form-control-state-example.component.html',
  styleUrls: ['./form-control-state-example.component.scss'],
})
export class FormControlStateExampleComponent {
  disabled = false;
  readonly = false;
  model?: any;
  controlDisabled = false;
  modelDisabled = false;
  controlReadonly = false;
  modelReadonly = false;

  model2?: any;

  code = `<input paFormControl [disabled]="disabled" [readonly]="readonly">
<input paFormControl
    [(ngModel)]="model">
    [disabled]="disabled"
    [readonly]="readonly"`;

  @ViewChildren(PaFormControlDirective) directives?: QueryList<PaFormControlDirective>;

  constructor(private cdr: ChangeDetectorRef) {}

  setDisabled() {
    this.disabled = !this.disabled;
    detectChanges(this.cdr);
    const controls = this.directives?.toArray().map((d) => d.control);
    if (controls) {
      this.controlDisabled = controls[0].disabled;
      this.modelDisabled = controls[1].disabled;
    }
  }

  setReadonly() {
    this.readonly = !this.readonly;
    detectChanges(this.cdr);
    const controls = this.directives?.toArray();
    if (controls) {
      this.controlReadonly = controls[0].readonly;
      this.modelReadonly = controls[1].readonly;
    }
  }
}
