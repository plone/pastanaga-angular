import { Inject, Injectable, InjectionToken } from '@angular/core';

export const PA_LANG = new InjectionToken<string>('pastanaga.lang');

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private _currentLanguage: string;

    set currentLanguage(language: string) {
        this._currentLanguage = language;
    }
    get currentLanguage() {
        return this._currentLanguage;
    }

    constructor(@Inject(PA_LANG) private lang: any) {
        this._currentLanguage = lang;
    }
}
