import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeprecatedInputComponent } from './input/deprecated-input.component';
import { DeprecatedSelectComponent } from './select/deprecated-select.component';
import { PaIconModule } from '../../icon/icon.module';
import { PaPopupModule } from '../../popup/popup.module';
import { PaDropdownModule } from '../../dropdown/dropdown.module';
import { DeprecatedTextareaComponent } from './textarea/deprecated-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';

@NgModule({
    declarations: [InputComponent, DeprecatedSelectComponent, DeprecatedInputComponent, DeprecatedTextareaComponent],
    imports: [CommonModule, PaIconModule, PaDropdownModule, PaPopupModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, DeprecatedSelectComponent, DeprecatedInputComponent, DeprecatedTextareaComponent],
})
export class PaTextFieldModule {}
