import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipCloseableComponent } from './chip-closeable/chip-closeable.component';
import { PaAvatarModule } from '../avatar/avatar.module';
import { PaButtonModule } from '../button/button.module';
import { ChipSelectionableComponent } from './chip-selectionable/chip-selectionable.component';
import { PaIconModule } from '../icon/icon.module';
import { PaFocusableModule } from '../focusable/focusable.module';

@NgModule({
    imports: [CommonModule, PaAvatarModule, PaButtonModule, PaIconModule, PaFocusableModule],
    declarations: [ChipCloseableComponent, ChipSelectionableComponent],
    exports: [ChipCloseableComponent, ChipSelectionableComponent],
})
export class PaChipsModule {}
