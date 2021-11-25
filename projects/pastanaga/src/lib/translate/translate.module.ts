import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TRANSLATIONS } from './translate.pipe';
import { TranslateDirective } from './translate.directive';
import { TranslateService } from './translate.service';
import { Translation } from './translate.model';
import { mergeTranslations } from './translate.utils';

const _TRANSLATIONS: Translation = {};

@NgModule({
    imports: [CommonModule],
    exports: [TranslatePipe, TranslateDirective, TranslateService],
    declarations: [TranslatePipe, TranslateDirective, TranslateService],
    providers: [TranslatePipe],
})
export class TranslateModule {
    static addTranslations(newTranslations: Translation[]): ModuleWithProviders<TranslateModule> {
        mergeTranslations(_TRANSLATIONS, newTranslations);
        return {
            ngModule: TranslateModule,
            providers: [
                {
                    provide: TRANSLATIONS,
                    useFactory: () => _TRANSLATIONS,
                },
            ],
        };
    }
}
