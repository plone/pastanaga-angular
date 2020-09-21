import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Marker, Normalizer, Resolver, TraversalModule } from 'angular-traversal';
import { PaDemoModule } from './demo/demo.module';
import { APP_BASE_HREF } from '@angular/common';
import { AppMarker } from './app.marker';
import { AppResolver } from './app.resolver';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { I18N_EN, mergeTranslations, PaButtonModule, PA_TRANSLATIONS, PA_LANG } from '../../../pastanaga-angular/src';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [BrowserModule, TraversalModule, AngularSvgIconModule.forRoot(), PaDemoModule, PaButtonModule],
            providers: [
                { provide: Marker, useClass: AppMarker },
                { provide: Resolver, useClass: AppResolver },
                { provide: Normalizer },
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: PA_LANG, useValue: 'en_US' },
                {
                    provide: PA_TRANSLATIONS,
                    useValue: {
                        en_US: mergeTranslations([I18N_EN]),
                    },
                },
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
