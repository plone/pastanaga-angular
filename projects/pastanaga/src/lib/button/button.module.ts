import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './button.component';
import { ButtonLinkComponent } from './button-link.component';
import { SvgModule } from '../svg/module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        SvgModule,
    ],
    declarations: [ButtonComponent, ButtonLinkComponent],
    exports: [ButtonComponent, ButtonLinkComponent],
})
export class ButtonModule {
}
