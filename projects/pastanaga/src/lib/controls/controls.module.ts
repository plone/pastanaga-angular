import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { FilteredCheckboxGroupComponent } from './filtered-checkbox-group/filtered-checkbox-group.component';
import { DirectoryComponent } from './filtered-checkbox-group/directory.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        BadgeModule,
        ButtonModule,
        SvgModule,
        TooltipModule,
        ScrollingModule,
    ],
    declarations: [
        CheckboxComponent,
        CheckboxGroupComponent,
        CheckboxTreeComponent,
        DirectoryComponent,
        DoubleSliderComponent,
        FilteredCheckboxGroupComponent,
        SliderComponent,
        ToggleComponent,
        ToggleGroupComponent,
    ],
    exports: [
        CheckboxComponent,
        CheckboxGroupComponent,
        CheckboxTreeComponent,
        DirectoryComponent,
        DoubleSliderComponent,
        FilteredCheckboxGroupComponent,
        SliderComponent,
        ToggleComponent,
        ToggleGroupComponent,
    ]
})
export class ControlsModule {
}
