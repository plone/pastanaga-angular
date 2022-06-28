import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@guillotinaweb/pastanaga-angular';

@Component({
    selector: 'pa-translate-doc',
    templateUrl: './translate-page.component.html',
    styleUrls: ['./translate-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePageComponent {
    translations = `export const I18N_EN: TranslationEntries = {
    pastanaga: {
        datetime: {
            'a-few-seconds-ago': 'Just now',
            minutesAgo: '{{minutes}} mins ago',
            'one-minute-ago': '1 min ago',
            yesterday: 'Yesterday',
        },
        // …
    },
};
`;
    flattenTranslations = `export const I18N_EN: TranslationEntries = {
  'pastanaga.datetime.a-few-seconds-ago': 'Just now',
  'pastanaga.datetime.minutesAgo': '{{minutes}} mins ago',
  'pastanaga.datetime.one-minute-ago': '1 min ago',
  //…
};
`;
    translationsMix = `export const I18N_EN: TranslationEntries = {
  pastanaga: {
    datetime: {
      'a-few-seconds-ago': 'Just now',
      minutesAgo: '{{minutes}} mins ago',
    },
  },
  'pastanaga.datetime.one-minute-ago': '1 min ago',
  'pastanaga.datetime.yesterday': 'Yesterday',
  //…
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
    directiveAttributeExample = `<span translate='demo-page.title'></span>`;
    directiveWithParamsExample = `<span translate [translateParams]='{points: 10, total: 25}'>demo-page.score</span>`;
    pipeSimpleExample = `<span>{{ 'demo-page.title' | translate}}</span>`;
    pipeWithParamsExample = `<span>{{ 'demo-page.score' | translate:{points: 10, total: 25} }}</span>`;

    ngxTranslateAndPastanaga = `@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'ngx-and-pa-translate';

  private _terminator = new Subject<void>();

  constructor(private ngxTranslate: ngxTranslateService, private paTranslate: paTranslateService) {
    ngxTranslate.addLangs(['en', 'fr']);
    ngxTranslate.setDefaultLang('en');

    const browserLang = ngxTranslate.getBrowserLang() || '';
    const lang = browserLang.match(/en|fr/) ? browserLang : 'en';
    ngxTranslate.use(lang);
    this.ngxTranslate.onLangChange.subscribe((event) => {
      this.paTranslate.initTranslationsAndUse(event.lang,  event.translations);
    });
  }

  ngOnDestroy() {
    this._terminator.next();
    this._terminator.complete();
  }

  changeLanguage() {
    const lang = this.ngxTranslate.currentLang === 'en' ? 'fr' : 'en';
    this.ngxTranslate.use(lang);
  }
}`;
    noPaTranslateModule = `@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularSvgIconModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PaDatePickerModule,
    PaButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`;

    dynamicallyChangePastanagaLang = `constructor(private translateService: TranslateService) {}

updateLanguage(language: string) {
    this.translateService.use(language);
}`;

    languages = ['en', 'fr', 'latin'];
    currentLanguage = 'en';

    constructor(private translateService: TranslateService) {}

    updateLanguage(language: string) {
        this.currentLanguage = language;
        this.translateService.use(language);
    }
}
