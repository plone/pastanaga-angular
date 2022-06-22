import { TranslateDirective } from './translate.directive';
import { PA_TRANSLATIONS, TranslatePipe } from './translate.pipe';
import { ElementRef } from '@angular/core';
import { PA_LANG, TranslateService } from './translate.service';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

class MockElementRef implements ElementRef {
    nativeElement = {};
}

const obj1 = { common: 1, second: 2 };
const obj2 = { common: 1, color: 'blue' };
const obj3 = { common: 1, second: 3 };

describe('TranslateDirective', () => {
    const translations = {
        en_US: {
            hello: 'Bonjour',
            welcome: 'Bienvenue {{name}}',
            'pastanaga.cancel': 'Cancel',
            calendar: { months: 'Mois', years: 'Années' },
        },
    };

    let directive: TranslateDirective;

    describe('in template', () => {
        const createDirective = createDirectiveFactory({
            directive: TranslateDirective,
            declarations: [TranslatePipe],
            providers: [
                { provide: PA_LANG, useValue: 'en_US' },
                {
                    provide: PA_TRANSLATIONS,
                    useFactory: () => translations,
                },
                { provide: TranslatePipe, useClass: TranslatePipe },
            ],
        });
        let spectator: SpectatorDirective<TranslateDirective>;

        it('should translate a simple key', () => {
            spectator = createDirective(`<span translate>hello</span>`);
            spectator.detectChanges();
            expect(spectator.query('span')?.textContent).toBe(translations.en_US.hello);
        });

        it('should translate a flatten key', () => {
            spectator = createDirective(`<span translate>pastanaga.cancel</span>`);
            spectator.detectChanges();
            expect(spectator.query('span')?.textContent).toBe(translations.en_US['pastanaga.cancel']);
        });

        it('should translate a hierarchical key', () => {
            spectator = createDirective(`<span translate>calendar.months</span>`);
            spectator.detectChanges();
            expect(spectator.query('span')?.textContent).toBe(translations.en_US.calendar.months);
        });

        it('should translate a key with params', () => {
            spectator = createDirective(`<span translate [translateParams]="{name: 'Toto'}">welcome</span>`);
            spectator.detectChanges();
            expect(spectator.query('span')?.textContent).toBe(translations.en_US.welcome.replace('{{name}}', 'Toto'));
        });

        it('should translate a key with params and update the params when it changes', () => {
            let params = { name: 'Toto' };
            spectator = createDirective(`<span translate [translateParams]="params">welcome</span>`, {
                hostProps: { params },
            });
            spectator.detectChanges();
            expect(spectator.query('span')?.textContent).toBe(translations.en_US.welcome.replace('{{name}}', 'Toto'));

            // @ts-ignore update hostComponent directly
            spectator.hostComponent.params = { name: 'Titi' };
            spectator.detectChanges();
            expect(spectator.query('span')?.textContent).toBe(translations.en_US.welcome.replace('{{name}}', 'Titi'));
        });

        it('should translate a simple attribute', () => {
            spectator = createDirective(`<span translate="hello"></span>`);
            spectator.detectChanges();
            expect(spectator.query('span')?.textContent).toBe(translations.en_US.hello);
        });

        it('should translate a simple attribute with params', () => {
            spectator = createDirective(`<span translate="welcome" [translateParams]="{name: 'Toto'}"></span>`);
            spectator.detectChanges();
            expect(spectator.query('span')?.textContent).toBe(translations.en_US.welcome.replace('{{name}}', 'Toto'));
        });
    });

    describe('areEquals', () => {
        beforeEach(() => {
            directive = new TranslateDirective(
                new MockElementRef(),
                new TranslatePipe(new TranslateService('en_US'), {}),
            );
        });

        it('should be false when testing 2 objects with a different property ', () => {
            expect(directive.areEquals(obj1, obj2)).toBe(false);
        });

        it('should be true when testing 2 equal objects ', () => {
            expect(directive.areEquals(obj1, obj1)).toBe(true);
        });

        it('should be false when testing 2 objects with a different property value ', () => {
            expect(directive.areEquals(obj1, obj3)).toBe(false);
        });
    });
});
