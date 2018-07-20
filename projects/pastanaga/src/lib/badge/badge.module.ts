import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge.component';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
    ],
    declarations: [BadgeComponent],
    exports: [BadgeComponent],
})
export class BadgeModule {
}
