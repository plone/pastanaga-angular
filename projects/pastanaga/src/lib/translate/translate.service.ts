import { Injectable, Inject, InjectionToken } from '@angular/core';

export const LANG = new InjectionToken<string>('pastanaga.v1.lang');

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    currentLanguage: string;
    constructor(@Inject(LANG) private lang: any) {
        this.currentLanguage = lang;
    }

    setLang(lang: string) {
        this.currentLanguage = lang;
    }
}
