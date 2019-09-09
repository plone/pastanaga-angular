import { Pipe, PipeTransform } from '@angular/core';
import * as translateKeys from '../../../../../src/assets/i18n/en.json';
@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    lastKey?: string;
    lastParams?: string;
    value: string = '';
    transform(key: string, args?: any): any {
        // if we ask another time for the same key, return the last value
        if (key === this.lastKey && args === this.lastParams) {
            return this.value;
        }
        const keys = !!key ? key.split('.') : [];
        this.value = translateKeys['default'];
        keys.map(k => {
            this.value = this.value[k];
            if (!this.value) {
                this.value = '';
            }
        });
        if (!!this.value && !!args) {
            this.lastParams = args;
            Object.keys(args).map(key => {
                this.value = this.value.replace(`{{${key}}}`, args[key]);
            });
        }

        return !!this.value ? this.value : key;
    }

}
