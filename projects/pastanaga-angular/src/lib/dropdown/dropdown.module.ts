import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaPopupModule } from '../popup/popup.module';
import { PaIconModule } from '../icon/icon.module';

import { DropdownComponent } from './dropdown.component';
import { OptionComponent } from './option/option.component';
import { SeparatorComponent } from './separator/separator.component';
import { OptionHeaderComponent } from './option-header/option-header.component';
import { PaFocusableModule } from '../focusable/focusable.module';
import { PaAvatarModule } from '../avatar/avatar.module';

const COMPONENTS = [DropdownComponent, OptionHeaderComponent, OptionComponent, SeparatorComponent];

@NgModule({
    imports: [CommonModule, PaIconModule, PaPopupModule, PaFocusableModule, PaAvatarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaDropdownModule {}
