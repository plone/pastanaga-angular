import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SvgModule } from '../svg/svg.module';
import { BadgeModule } from '../badge/badge.module';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ToggleComponent } from './toggle/toggle.component';
import { ToggleGroupComponent } from './toggle-group/toggle-group.component';
import { SliderComponent } from './slider/slider.component';
import { DoubleSliderComponent } from './double-slider/double-slider.component';
import { CheckboxTreeComponent } from './checkbox-tree/checkbox-tree.component';
import { TranslateModule } from '../translate/translate.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        TranslateModule,
        BadgeModule,
        ButtonModule,
        SvgModule,
        TooltipModule,
    ],
    declarations: [
        CheckboxComponent,
        CheckboxTreeComponent,
        DoubleSliderComponent,
        SliderComponent,
        ToggleComponent,
        ToggleGroupComponent,
    ],
    exports: [
        CheckboxComponent,
        CheckboxTreeComponent,
        DoubleSliderComponent,
        SliderComponent,
        ToggleComponent,
        ToggleGroupComponent,
    ]
})
export class ControlsModule {
}
