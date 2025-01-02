import { ChangeDetectorRef, Component } from '@angular/core';
import { markForCheck } from '@guillotinaweb/pastanaga-angular';

@Component({
  templateUrl: './form-control-page.component.html',
  styleUrls: ['./form-control-page.component.scss'],
  standalone: false,
})
export class FormControlPageComponent {
  selected = 'id';
  standaloneCode = `<input paFormControl [value]="myValue"/>`;
  ngModelCode = `<input paFormControl [(ngModel)]="myModel"/>`;
  formControlCode = `<input paFormControl [formControl]="myFormControl"/>
<input paFormControl [formControlName]="nameInAFormGroup"/>`;
  constructor(private cdr: ChangeDetectorRef) {}

  selectExample(exampleRef: string) {
    if (this.selected === exampleRef) {
      this.selected = '';
    } else {
      this.selected = exampleRef;
    }
    markForCheck(this.cdr);
  }
}
