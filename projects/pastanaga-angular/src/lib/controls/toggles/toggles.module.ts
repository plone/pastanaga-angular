import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeprecatedCheckboxComponent } from './checkbox/deprecated-checkbox.component';
import { DeprecatedToggleComponent } from './toggle/deprecated-toggle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [DeprecatedCheckboxComponent, DeprecatedToggleComponent],
    imports: [CommonModule, FormsModule],
    exports: [DeprecatedCheckboxComponent, DeprecatedToggleComponent],
})
export class PaTogglesModule {}
