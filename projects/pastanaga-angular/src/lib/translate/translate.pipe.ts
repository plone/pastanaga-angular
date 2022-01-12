import { Inject, InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

const HTML_TAG_DELIMITERS = new RegExp(/[<>]/gim);

export const PA_TRANSLATIONS = new InjectionToken<string>('pastanaga.translations');

@Pipe({
    name: 'translate',
    pure: true,
})
export class TranslatePipe implements PipeTransform {
    lastKey?: string;
    lastParams?: string;
    value: string | undefined = '';

    constructor(private translateService: TranslateService, @Inject(PA_TRANSLATIONS) private translations: any) {
    }

    transform(key?: string, args?: any): string {
        if (!key) {
            return '';
        }
        // if we ask another time for the same key, return the last value
        if (key === this.lastKey && args === this.lastParams) {
            return this.value as string;
        }
        this.lastKey = key;
        const keys = !!key ? key.split('.') : [];
        this.value = this.getValue(keys, this.translateService.currentLanguage, this.translations) || this.getValue(keys, 'en_US', this.translations);
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
        let value = translations[lang] || {};
        keys.forEach((k) => {
            if (!!value) {
                value = value[k];
            }
        });
        return !value || typeof value === 'string' ? value : keys.join('.');
    }
}
