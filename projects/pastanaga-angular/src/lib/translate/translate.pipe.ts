import { Pipe, PipeTransform, Inject, InjectionToken } from '@angular/core';
import { PA_TRANSLATIONS } from './translate.model';

const HTML_TAG_DELIMITERS = new RegExp(/[<>]/gim);
export const PA_LANG = new InjectionToken<string>('pastanaga.lang');

@Pipe({
    name: 'translate',
    pure: true,
})
export class TranslatePipe implements PipeTransform {
    lastKey?: string;
    lastParams?: string;
    value: string | undefined = '';

    constructor(@Inject(PA_LANG) private lang: any) {}

    transform(key?: string, args?: any): string {
        if (!key) {
            return '';
        }
        // if we ask another time for the same key, return the last value
        if (key === this.lastKey && args === this.lastParams) {
            return this.value as string;
        }
        const keys = !!key ? key.split('.') : [];
        this.value =
            this.lang === 'en_US'
                ? this.getValue(keys, 'en_US', PA_TRANSLATIONS)
                : this.getValue(keys, this.lang, PA_TRANSLATIONS) || this.getValue(keys, 'en_US', PA_TRANSLATIONS);
        if (!!this.value && !!args) {
            this.lastParams = args;
            let value = this.value;
            Object.keys(args).forEach((param) => {
                let paramValue = args[param];
                if (typeof paramValue === 'string') {
                    paramValue = paramValue.replace(HTML_TAG_DELIMITERS, (c) => '&#' + c.charCodeAt(0) + ';');
                }
                value = value.replace(new RegExp(`{{${param}}}`, 'g'), paramValue);
            });
            this.value = value;
        }

        return !!this.value || this.value === '' ? this.value : key;
    }

    private getValue(keys: string[], lang: string, translations: any): string | undefined {
        const translateKeys = translations[lang] || {};
        let value = translateKeys;
        keys.forEach((k) => {
            if (!!value) {
                value = value[k];
            }
        });
        return !value || typeof value === 'string' ? value : keys.join('.');
    }
}
