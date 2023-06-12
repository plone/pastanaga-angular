import { Directive } from '@angular/core';

@Directive({
  selector: '[paDemoFormFieldConfigStandalone]',
})
export class FormFieldConfigStandaloneDirective {
  value?: any;
  valueChangeEvent?: any;
  statusChangeEvent?: any;
  config?: any = {};

  updateConfig(config: any) {
    if (config.value !== this.config.value && (!!config.value || !!this.config.value)) {
      this.value = config.value;
    }
  }
}
