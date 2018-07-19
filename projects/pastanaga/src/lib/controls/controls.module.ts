import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SvgModule } from '../svg/module';
import { CheckboxExpandableComponent } from './checkbox-expandable/checkbox-expandable.component';
import { BadgeModule } from '../badge/badge.module';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        BadgeModule,
        ButtonModule,
        SvgModule,
    ],
    declarations: [
        CheckboxComponent,
        CheckboxExpandableComponent,
        CheckboxGroupComponent,
    ],
    exports: [
        CheckboxComponent,
        CheckboxExpandableComponent,
        CheckboxGroupComponent,
    ]
})
export class ControlsModule {
}
