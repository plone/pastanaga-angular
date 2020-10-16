import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge.component';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TranslateModule } from '../translate/translate.module';
import { AvatarModule } from '../avatar/avatar.module';
import { SvgModule } from '../svg/svg.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
        TranslateModule,
        AvatarModule,
        SvgModule,
    ],
    declarations: [BadgeComponent],
    exports: [BadgeComponent],
})
export class BadgeModule {
}
