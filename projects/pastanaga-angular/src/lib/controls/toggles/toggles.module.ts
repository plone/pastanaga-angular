import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeprecatedToggleComponent } from './toggle/deprecated-toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PaFocusableModule } from '../../focusable/focusable.module';
import { PaFormFieldModule } from '../form-field/form-field.module';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
    declarations: [DeprecatedToggleComponent, CheckboxComponent, ToggleComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PaFocusableModule, PaFormFieldModule],
    exports: [DeprecatedToggleComponent, CheckboxComponent, ToggleComponent],
})
export class PaTogglesModule {}
