import { Pipe, PipeTransform, Inject } from '@angular/core';
@Pipe({
  name: 'translate',
  pure: true,
})
export class TranslatePipe implements PipeTransform {
    lastKey?: string;
    lastParams?: string;
    value: string | undefined = '';

    constructor(
        @Inject('LANG') private lang: any,
        @Inject('TRANSLATIONS') private translations: any,
    ) {}

    transform(key: string, args?: any): string {
        if (!key) {
            return '';
        }
        // if we ask another time for the same key, return the last value
        if (key === this.lastKey && args === this.lastParams) {
            return this.value as string;
        }
        const keys = !!key ? key.split('.') : [];
        this.value = this.lang === 'en_US' ? this.getValue(keys, 'en_US', this.translations) :
            (this.getValue(keys, this.lang, this.translations) || this.getValue(keys, 'en_US', this.translations));
        if (!!this.value && !!args) {
            this.lastParams = args;
            let value = this.value;
            Object.keys(args).forEach(param => {
                value = value.replace(new RegExp(`{{${param}}}`, 'g'), args[param]);
            });
            this.value = value;
        }

        return (!!this.value || this.value === '') ? this.value : key;
    }

    private getValue(keys: string[], lang: string, translations: any): string | undefined {
        const translateKeys = translations[lang] || {};
        let value = !!translateKeys['default'] ? translateKeys['default'] : translateKeys;
        keys.forEach(k => {
            if (!!value) {
                value = value[k];
            }
        });
        return !value || typeof value === 'string' ? value : keys.join('.');
    }

}
