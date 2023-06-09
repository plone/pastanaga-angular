import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { PaFocusableModule } from '../focusable';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
  imports: [CommonModule, PaFocusableModule],
})
export class PaCardModule {}
