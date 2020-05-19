import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { SvgModule } from '../svg/svg.module';
import { TranslateModule } from '../translate/translate.module';

@NgModule({
    imports: [
        CommonModule,
        SvgModule,
        TranslateModule,
    ],
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
})
export class ButtonModule {
}
