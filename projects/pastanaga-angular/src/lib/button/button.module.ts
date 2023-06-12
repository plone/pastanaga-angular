import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { PaIconModule } from '../icon';
import { PaFocusableModule } from '../focusable';

@NgModule({
  imports: [CommonModule, PaIconModule, PaFocusableModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class PaButtonModule {}
