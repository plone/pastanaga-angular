import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';
import { PaFormFieldModule } from '../form-field';
import { PaFocusableModule } from '../../focusable';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, FormsModule, PaFormFieldModule, ReactiveFormsModule, PaFocusableModule],
  exports: [SliderComponent],
})
export class PaSliderModule {}
