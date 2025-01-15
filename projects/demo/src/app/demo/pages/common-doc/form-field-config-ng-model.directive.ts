import { ChangeDetectorRef, Directive } from '@angular/core';
import { detectChanges } from '@guillotinaweb/pastanaga-angular';

@Directive({
  selector: '[paDemoFormFieldConfigNgModel]',
  standalone: false,
})
export class FormFieldConfigNgModelDirective {
  model?: any;

  valueChangeEvent?: any;
  statusChangeEvent?: any;
  ngModelChangeEvent?: any;

  config?: any = {};

  constructor(protected cdr: ChangeDetectorRef) {}

  updateConfig(config: any) {
    if (config.value !== this.config.value && (!!config.value || !!this.config.value)) {
      this.model = config.value;
      detectChanges(this.cdr);
    }
  }
}
