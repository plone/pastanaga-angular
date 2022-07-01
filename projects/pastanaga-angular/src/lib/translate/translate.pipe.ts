import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from './translate.service';
import { Subscription } from 'rxjs';
import { markForCheck } from '../common';

@Pipe({
    name: 'translate',
    pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
    lastKey?: string;
    lastParams?: string;
    value: string | undefined = '';

    onTranslationChange?: Subscription;

    constructor(private translateService: TranslateService, private cdr: ChangeDetectorRef) {}

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
        this.lastParams = args;

        this.updateValue(key, args);

        // subscribe to onTranslationChange event, in case the translations change
        if (!this.onTranslationChange) {
            this.onTranslationChange = this.translateService.onTranslationChange.subscribe(
                (event: TranslationChangeEvent) => {
                    if (this.lastKey && event.lang === this.translateService.currentLanguage) {
                        this.lastKey = undefined;
                        this.updateValue(key, args);
                    }
                },
            );
        }

        return this.value || '';
    }

    private updateValue(key: string, args: any) {
        this.value = this.translateService.getValue(key, args);
        if (!!this.value) {
            markForCheck(this.cdr);
        }
    }

    private _cleanUpSubscriptions(): void {
        if (typeof this.onTranslationChange !== 'undefined') {
            this.onTranslationChange.unsubscribe();
            this.onTranslationChange = undefined;
        }
    }
}
