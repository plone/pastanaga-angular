import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SvgModule } from '../svg/svg.module';
import { CheckboxExpandableComponent } from './checkbox-expandable/checkbox-expandable.component';
import { BadgeModule } from '../badge/badge.module';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { ButtonModule } from '../button/button.module';
import { ToggleComponent } from './toggle/toggle.component';
import { ToggleGroupComponent } from './toggle-group/toggle-group.component';
import { SliderComponent } from './slider/slider.component';
import { DoubleSliderComponent } from './double-slider/double-slider.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        TranslateModule,
        BadgeModule,
        ButtonModule,
        SvgModule,
    ],
    declarations: [
        CheckboxComponent,
        CheckboxExpandableComponent,
        CheckboxGroupComponent,
        DoubleSliderComponent,
        SliderComponent,
        ToggleComponent,
        ToggleGroupComponent,
    ],
    exports: [
        CheckboxComponent,
        CheckboxExpandableComponent,
        CheckboxGroupComponent,
        DoubleSliderComponent,
        SliderComponent,
        ToggleComponent,
        ToggleGroupComponent,
    ]
})
export class ControlsModule {
}
