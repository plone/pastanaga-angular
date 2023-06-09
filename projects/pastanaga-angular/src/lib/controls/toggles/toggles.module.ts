import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PaFocusableModule } from '../../focusable';
import { PaFormFieldModule } from '../form-field';
import { ToggleComponent } from './toggle/toggle.component';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupDirective } from './radio/radio-group.directive';

@NgModule({
  declarations: [CheckboxComponent, ToggleComponent, RadioComponent, RadioGroupDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PaFocusableModule, PaFormFieldModule],
  exports: [CheckboxComponent, ToggleComponent, RadioComponent, RadioGroupDirective],
})
export class PaTogglesModule {}
