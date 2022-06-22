import { InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';
import { Translation } from './translate.model';

const HTML_TAG_DELIMITERS = new RegExp(/[<>]/gim);

export const PA_TRANSLATIONS = new InjectionToken<Translation>('pastanaga.translations', {
    factory: () => ({})
});

@Pipe({
    name: 'translate',
    pure: true,
})
export class TranslatePipe implements PipeTransform {
    lastKey?: string;
    lastParams?: string;
    value: string | undefined = '';

    constructor(private translateService: TranslateService) {
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

        this.value = this.getValue(key, this.translateService.currentLanguage) || this.getValue(key, 'en_US');
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

    private getValue(key: string, lang: string): string | undefined {
        const translations = this.translateService.flattenTranslations[lang] || {};
        return translations[key];
    }
}
