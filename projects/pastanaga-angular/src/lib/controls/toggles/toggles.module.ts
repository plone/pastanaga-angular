import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeprecatedCheckboxComponent } from './checkbox/deprecated/deprecated-checkbox.component';
import { DeprecatedToggleComponent } from './toggle/deprecated-toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
    declarations: [DeprecatedCheckboxComponent, DeprecatedToggleComponent, CheckboxComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [DeprecatedCheckboxComponent, DeprecatedToggleComponent, CheckboxComponent],
})
export class PaTogglesModule {}
