import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { SvgModule } from '../svg/svg.module';
import { TranslateModule } from '../translate/translate.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { DropdownComponent } from './dropdown.component';
import { DropdownSeparatorComponent } from './dropdown-separator.component';
import { DropdownSectionComponent } from './dropdown-section.component';
import { DropdownItemComponent } from './dropdown-item.component';
import { ControlsModule } from '../controls/controls.module';
import { DropdownCheckboxComponent } from './dropdown-checkbox.component';
import { BadgeModule } from '../badge/badge.module';
import { PopupModule } from '../popup/popup.module';

@NgModule({
    imports: [
        CommonModule,
        BadgeModule,
        ButtonModule,
        ControlsModule,
        PopupModule,
        SvgModule,
        TooltipModule,
        TranslateModule,
    ],
    exports: [
        DropdownComponent,
        DropdownCheckboxComponent,
        DropdownItemComponent,
        DropdownSectionComponent,
        DropdownSeparatorComponent,
    ],
    declarations: [
        DropdownComponent,
        DropdownCheckboxComponent,
        DropdownItemComponent,
        DropdownSectionComponent,
        DropdownSeparatorComponent,
    ],
})
export class DropdownModule {}
