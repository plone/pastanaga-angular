import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PA_TRANSLATIONS, TranslatePipe } from './translate.pipe';
import { TranslateDirective } from './translate.directive';
import { Translation } from './translate.model';
import { mergeTranslations } from './translate.utils';

const _TRANSLATIONS: Translation = {};

@NgModule({
    imports: [CommonModule],
    exports: [TranslatePipe, TranslateDirective],
    declarations: [TranslatePipe, TranslateDirective],
    providers: [TranslatePipe],
})
export class PaTranslateModule {
    static addTranslations(newTranslations: Translation[]): ModuleWithProviders<PaTranslateModule> {
        mergeTranslations(_TRANSLATIONS, newTranslations);
        return {
            ngModule: PaTranslateModule,
            providers: [
                {
                    provide: PA_TRANSLATIONS,
                    useFactory: () => _TRANSLATIONS,
                },
            ],
        };
    }
}
