import { ChangeDetectorRef, InjectionToken, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from './translate.service';
import { Translation } from './translate.model';
import { Subscription } from 'rxjs';
import { markForCheck } from '../common';

const HTML_TAG_DELIMITERS = new RegExp(/[<>]/gim);

export const PA_TRANSLATIONS = new InjectionToken<Translation>('pastanaga.translations', {
    factory: () => ({})
});

@Pipe({
    name: 'translate',
    pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
    lastKey?: string;
    lastParams?: string;
    value: string | undefined = '';

    onTranslationChange: Subscription | undefined;

    constructor(private translateService: TranslateService, private cdr: ChangeDetectorRef) {
    }

    ngOnDestroy() {
        this._cleanUpSubscriptions();
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

        this.updateValue(key, args);

        // subscribe to onTranslationChange event, in case the translations change
        if (!this.onTranslationChange) {
            this.onTranslationChange = this.translateService.onTranslationChange.subscribe((event: TranslationChangeEvent) => {
                if (this.lastKey && event.lang === this.translateService.currentLanguage) {
                    this.lastKey = undefined;
                    this.updateValue(key, args);
                }
            });
        }

        return !!this.value || this.value === '' ? this.value : key;
    }

    private updateValue(key: string, args: any) {
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
        if (!!this.value) {
            markForCheck(this.cdr);
        }
    }

    private getValue(key: string, lang: string): string | undefined {
        const translations = this.translateService.flattenTranslations[lang] || {};
        return translations[key];
    }

    private _cleanUpSubscriptions(): void {
        if (typeof this.onTranslationChange !== 'undefined') {
            this.onTranslationChange.unsubscribe();
            this.onTranslationChange = undefined;
        }
    }
}
