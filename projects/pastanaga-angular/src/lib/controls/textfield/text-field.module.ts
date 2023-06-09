import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaIconModule } from '../../icon';
import { PaPopupModule } from '../../popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { InputFormatterDirective } from './input-formatter.directive';
import { A11yModule } from '@angular/cdk/a11y';
import { PaFocusableModule } from '../../focusable';
import { PaFormFieldModule } from '../form-field';
import { SelectComponent, SelectOptionsComponent } from './select';
import { PaTextareaAutoHeightDirective, TextareaComponent } from './textarea';
import { NativeTextFieldDirective } from './native-text-field.directive';
import { OptionComponent, OptionHeaderComponent, PaDropdownModule, SeparatorComponent } from '../../dropdown';
import { TextFieldDirective } from './text-field.directive';
import { TypeaheadSelectComponent } from './typeahead-select/typeahead-select.component';

@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    InputFormatterDirective,
    SelectOptionsComponent,
    TextareaComponent,
    NativeTextFieldDirective,
    PaTextareaAutoHeightDirective,
    TextFieldDirective,
    TypeaheadSelectComponent,
  ],
  imports: [
    CommonModule,
    A11yModule,
    PaIconModule,
    PaDropdownModule,
    PaPopupModule,
    FormsModule,
    ReactiveFormsModule,
    PaFocusableModule,
    PaFormFieldModule,
  ],
  exports: [
    InputComponent,
    SelectComponent,
    InputFormatterDirective,
    TextareaComponent,
    NativeTextFieldDirective,
    PaTextareaAutoHeightDirective,
    OptionComponent,
    OptionHeaderComponent,
    SeparatorComponent,
    TypeaheadSelectComponent,
  ],
})
export class PaTextFieldModule {}
