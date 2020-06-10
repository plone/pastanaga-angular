import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-translate-doc',
    templateUrl: './translate-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePageComponent {
    translations = `{
    "calendar": {
        "next": "Next",
        "previous": "Previous",
        "select-start-date-legend": "Select start date",
        "select-end-date-legend": "Select end date",
        "no-end-button": "No end date",
        "days": {
            "monday": "M",
            "tuesday": "T",
            "wednesday": "W",
            "thursday": "T",
            "friday": "F",
            "saturday": "S",
            "sunday": "S"
        }
    },
    "common": {
        "close": "Close",
        "loading": "Loading…"
    }
}
`;
    appModule = `
import * as en from '../assets/i18n/en.json';
import * as la from '../assets/i18n/la.json';

@NgModule({
    ...
    providers: [
    {
        provide: 'TRANSLATIONS',
         useValue: {
            'en_US': {...en},
            'latin': {...la},
        }
    },
`;
    concatTranslations = `en_US: mergeTranslations([{...en}, {...custom}])`;
}
