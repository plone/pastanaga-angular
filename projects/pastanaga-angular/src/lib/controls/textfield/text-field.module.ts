import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionComponent, OptionHeaderComponent, PaDropdownModule, SeparatorComponent } from '../../dropdown';
import { PaFocusableModule } from '../../focusable';
import { PaIconModule } from '../../icon';
import { PaPopupModule } from '../../popup';
import { PaTooltipModule } from '../../tooltip';
import { PaFormFieldModule } from '../form-field';
import { PaTogglesModule } from '../toggles';
import { InputFormatterDirective } from './input-formatter.directive';
import { InputComponent } from './input/input.component';
import { NativeTextFieldDirective } from './native-text-field.directive';
import { SelectComponent, SelectOptionsComponent } from './select';
import { TextFieldDirective } from './text-field.directive';
import { PaTextareaAutoHeightDirective, TextareaComponent } from './textarea';
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
    PaTooltipModule,
    PaTogglesModule,
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
