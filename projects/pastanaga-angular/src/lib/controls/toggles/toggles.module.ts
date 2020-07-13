import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ToggleComponent } from './toggle/toggle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CheckboxComponent, ToggleComponent],
    imports: [CommonModule, FormsModule],
    exports: [CheckboxComponent, ToggleComponent],
})
export class PaTogglesModule {}
