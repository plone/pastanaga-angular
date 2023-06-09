import { ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { PaFormControlDirective, markForCheck } from '@guillotinaweb/pastanaga-angular';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'pa-demo-form-control-value-example',
  templateUrl: './form-control-value-example.component.html',
  styleUrls: ['./form-control-value-example.component.scss'],
})
export class FormControlValueExampleComponent {
  standaloneParentValue?: any;
  standaloneChangeEvent?: any;
  standaloneCode = `<input paFormControl
    [value]="..."
    (valueChange)="...">`;
  ngModelCode = `<input paFormControl [(ngModel)]="...">`;
  model = 'initial value';
  formControl = new UntypedFormControl('');
  formControlCode = `<input paFormControl [formControl]="formControl">`;
  @ViewChildren(PaFormControlDirective) directives?: QueryList<PaFormControlDirective>;

  constructor(private cdr: ChangeDetectorRef) {}

  onStandaloneChange(event: any) {
    this.standaloneChangeEvent = event;
  }

  standaloneParentToChildChange() {
    // reset former value;
    this.standaloneParentValue = undefined;
    markForCheck(this.cdr);
    this.standaloneParentValue = 'change from parent';
    markForCheck(this.cdr);
  }

  standaloneChildToParentChange() {
    this.directives?.first.control.patchValue('change from directive');
  }

  ngModelChildToParentChange() {
    this.directives?.toArray()[1].control.patchValue('change from directive');
  }

  ngModelParentToChildChange() {
    this.model = 'change from parent';
  }
  formControlChildToParentChange() {
    this.directives?.toArray()[2].control.patchValue('change from directive');
  }

  formControlParentToChildChange() {
    this.formControl.reset('change from parent');
  }
}
