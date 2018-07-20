import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './button.component';
import { ButtonLinkComponent } from './button-link.component';
import { SvgModule } from '../svg/svg.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SvgModule,
    ],
    declarations: [ButtonComponent, ButtonLinkComponent],
    exports: [ButtonComponent, ButtonLinkComponent],
})
export class ButtonModule {
}
