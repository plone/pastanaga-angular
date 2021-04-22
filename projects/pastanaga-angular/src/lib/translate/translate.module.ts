import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { TranslateDirective } from './translate.directive';
import { PA_TRANSLATIONS, Translation } from './translate.model';
import { mergeTranslations } from './translate.utils';

@NgModule({
    imports: [CommonModule],
    exports: [TranslatePipe, TranslateDirective],
    declarations: [TranslatePipe, TranslateDirective],
    providers: [TranslatePipe],
})
export class PaTranslateModule {
    static addTranslations(translations: Translation[]): ModuleWithProviders<PaTranslateModule> {
        mergeTranslations(translations);
        return {
            ngModule: PaTranslateModule,
            providers: [],
        };
    }
}
