import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {
    BadgeModule,
    ButtonModule,
    ControlsModule,
    ProgressModule,
    TextFieldModule,
    ToasterModule,
    TooltipModule
} from '../../projects/pastanaga/src';
import { Observable, of } from 'rxjs';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

class CustomLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of({});
    }
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: CustomLoader}
        }),

        BadgeModule,
        ButtonModule,
        ControlsModule,
        ProgressModule,
        ToasterModule.forRoot(),
        TextFieldModule,
        TooltipModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
