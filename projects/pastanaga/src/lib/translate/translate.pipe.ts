import { Pipe, PipeTransform } from '@angular/core';
import * as translateKeys from '../../../../../src/assets/i18n/en.json';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    lastKey?: string;
    lastParams?: string;
    value: string = '';
    constructor(private translateService: TranslateService) {}
    transform(key: string, args?: any): any {
        // if we ask another time for the same key, return the last value
        if (key === this.lastKey && args === this.lastParams) {
            return this.value;
        }
        const keys = !!key ? key.split('.') : [];
        let value = translateKeys['default'];
        keys.forEach(k => {
            value = value[k];
            if (!value) {
                value = '';
            }
        });
        this.value = value;
        if (!!this.value && !!args) {
            this.lastParams = args;
            Object.keys(args).forEach(key => {
                this.value = this.value.replace(`{{${key}}}`, args[key]);
            });
        }

        return !!this.value ? this.value : key;
    }

}
