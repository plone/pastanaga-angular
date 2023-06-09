import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaAvatarModule } from '../avatar';
import { PaButtonModule } from '../button';
import { PaIconModule } from '../icon';
import { PaFocusableModule } from '../focusable';
import { ChipCloseableComponent } from './chip-closeable/chip-closeable.component';
import { ChipSelectionableComponent } from './chip-selectionable/chip-selectionable.component';
import { ChipExpandableComponent } from './chip-expandable/chip-expandable.component';

@NgModule({
  imports: [CommonModule, PaAvatarModule, PaButtonModule, PaIconModule, PaFocusableModule],
  declarations: [ChipCloseableComponent, ChipSelectionableComponent, ChipExpandableComponent],
  exports: [ChipCloseableComponent, ChipSelectionableComponent, ChipExpandableComponent],
})
export class PaChipsModule {}
