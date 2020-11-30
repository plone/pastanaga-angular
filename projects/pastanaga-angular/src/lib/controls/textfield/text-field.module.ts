import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaIconModule } from '../../icon/icon.module';
import { PaPopupModule } from '../../popup/popup.module';
import { PaDropdownModule } from '../../dropdown/dropdown.module';
import { DeprecatedTextareaComponent } from './textarea/deprecated-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    declarations: [InputComponent, DeprecatedTextareaComponent, SelectComponent],
    imports: [
        CommonModule,
        A11yModule,
        PaIconModule,
        PaDropdownModule,
        PaPopupModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [InputComponent, DeprecatedTextareaComponent, SelectComponent],
})
export class PaTextFieldModule {}
