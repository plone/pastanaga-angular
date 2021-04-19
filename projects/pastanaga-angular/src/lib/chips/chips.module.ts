import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaAvatarModule } from '../avatar/avatar.module';
import { PaButtonModule } from '../button/button.module';
import { PaIconModule } from '../icon/icon.module';
import { PaFocusableModule } from '../focusable/focusable.module';
import { ChipCloseableComponent } from './chip-closeable/chip-closeable.component';
import { ChipSelectionableComponent } from './chip-selectionable/chip-selectionable.component';
import { ChipExpandableComponent } from './chip-expandable/chip-expandable.component';

@NgModule({
    imports: [CommonModule, PaAvatarModule, PaButtonModule, PaIconModule, PaFocusableModule],
    declarations: [ChipCloseableComponent, ChipSelectionableComponent, ChipExpandableComponent],
    exports: [ChipCloseableComponent, ChipSelectionableComponent, ChipExpandableComponent],
})
export class PaChipsModule {}
