import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button.component';
import { ButtonLinkComponent } from './button-link.component';
import { SvgModule } from '../svg/svg.module';
import { TraversalModule } from 'angular-traversal';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SvgModule,
        RouterModule,
        TraversalModule,
    ],
    declarations: [ButtonComponent, ButtonLinkComponent],
    exports: [ButtonComponent, ButtonLinkComponent],
})
export class ButtonModule {
}
