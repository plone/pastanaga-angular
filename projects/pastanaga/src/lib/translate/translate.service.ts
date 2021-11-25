import { Injectable, Inject } from '@angular/core';
import { LANG } from './translate.pipe';

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
