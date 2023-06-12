import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaPopupModule } from '../popup';
import { PaIconModule } from '../icon';

import { DropdownComponent } from './dropdown.component';
import { OptionComponent } from './option/option.component';
import { SeparatorComponent } from './separator/separator.component';
import { OptionHeaderComponent } from './option-header/option-header.component';
import { PaFocusableModule } from '../focusable';
import { PaAvatarModule } from '../avatar';
import { PaTooltipModule } from '../tooltip';
import { PaTranslateModule } from '../translate';

const COMPONENTS = [DropdownComponent, OptionHeaderComponent, OptionComponent, SeparatorComponent];

@NgModule({
  imports: [
    CommonModule,
    PaIconModule,
    PaPopupModule,
    PaFocusableModule,
    PaAvatarModule,
    PaTooltipModule,
    PaTranslateModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class PaDropdownModule {}
