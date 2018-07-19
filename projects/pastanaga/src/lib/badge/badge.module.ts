import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
    ],
    declarations: [BadgeComponent],
    exports: [BadgeComponent]
})
export class BadgeModule {
}
