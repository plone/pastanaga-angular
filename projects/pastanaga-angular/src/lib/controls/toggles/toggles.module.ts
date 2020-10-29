import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeprecatedToggleComponent } from './toggle/deprecated-toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PaFocusableModule } from '../../focusable/focusable.module';

@NgModule({
    declarations: [DeprecatedToggleComponent, CheckboxComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PaFocusableModule],
    exports: [DeprecatedToggleComponent, CheckboxComponent],
})
export class PaTogglesModule {}
