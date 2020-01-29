import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SvgModule } from '../svg/svg.module';

@NgModule({
    imports: [
        CommonModule,
        SvgModule,
        TooltipModule,
    ],
    exports: [AvatarComponent],
    declarations: [AvatarComponent],
})
export class AvatarModule {}
