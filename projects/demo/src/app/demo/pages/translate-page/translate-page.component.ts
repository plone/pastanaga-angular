import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@guillotinaweb/pastanaga-angular';
import { Traverser } from 'angular-traversal';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'pa-translate-doc',
    templateUrl: './translate-page.component.html',
    styleUrls: ['./translate-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePageComponent {
    translations = `export const I18N_EN: TranslationEntries = {
    pastanaga: {
        add: 'Add',
        back: 'Back',
        cancel: 'Cancel',
        clear: 'Clear',
        close: 'Close',
        collapse: 'Collapse',
        confirm: 'Confirm',
        continue: 'Continue',
        create: 'Create',
        datetime: {
            'a-few-seconds-ago': 'Just now',
            minutesAgo: '{{minutes}} mins ago',
            'one-minute-ago': '1 min ago',
            yesterday: 'Yesterday',
            at: 'at',
        },
        // …
    },
};
`;
    appModule = `
import { I18N_EN, PaTranslateModule, PA_LANG } from '@guillotinaweb/pastanaga-angular';
import { DEMO_LA } from '../assets/i18n/la';

@NgModule({
    imports : [
        //...
        PaTranslateModule.addTranslations([{ en_US: I18N_EN, latin: DEMO_LA }]),
    ],
    providers: [
        { provide: PA_LANG, useValue: 'en_US' },
    ],
    //...
`;
    moreTranslations = `@NgModule({
    imports : [
        //...
        PaTranslateModule.addTranslations([{'en_US': {...moreTranslationsForThisModule}}])
    ]`;
    directiveSimpleExample = `<span translate>demo-page.title</span>`;
    directiveWithParamsExample = `<span translate [translateParams]="{points: 10, total: 25}">demo-page.score</span>`;
    pipeSimpleExample = `<span>{{ 'demo-page.title' | translate}}</span>`;
    pipeWithParamsExample = `<span>{{ 'demo-page.score' | translate:{points: 10, total: 25} }}</span>`;

    languages = ['en', 'fr', 'latin'];
    currentLanguage = 'en';

    constructor(private translateService: TranslateService, private traverser: Traverser) {
        this.traverser.getQueryParams().pipe(filter(params => !!params.la)).subscribe(params => this.currentLanguage = params.la)
    }

    updateLanguage(language: string) {
        this.currentLanguage = language;
        this.translateService.currentLanguage = language;

        this.traverser.traverse(`/@@translate?la=${language}`);
    }
}
