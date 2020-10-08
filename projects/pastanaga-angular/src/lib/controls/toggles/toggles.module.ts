import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeprecatedToggleComponent } from './toggle/deprecated-toggle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
    declarations: [DeprecatedToggleComponent, CheckboxComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [DeprecatedToggleComponent, CheckboxComponent],
})
export class PaTogglesModule {}
