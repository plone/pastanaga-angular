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
import { PaDropdownModule, OptionComponent, OptionHeaderComponent, SeparatorComponent } from '../../dropdown';

@NgModule({
    declarations: [
        InputComponent,
        SelectComponent,
        InputFormatterDirective,
        SelectOptionsComponent,
        TextareaComponent,
        NativeTextFieldDirective,
        PaTextareaAutoHeightDirective,
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
    ],
})
export class PaTextFieldModule {}
