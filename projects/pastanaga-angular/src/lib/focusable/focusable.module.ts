import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { FocusableDirective } from './focusable.directive';

@NgModule({
  imports: [CommonModule, A11yModule],
  exports: [FocusableDirective],
  declarations: [FocusableDirective],
})
export class PaFocusableModule {}
