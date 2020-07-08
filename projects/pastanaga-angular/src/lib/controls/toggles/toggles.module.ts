import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
    declarations: [CheckboxComponent, ToggleComponent],
    imports: [CommonModule],
    exports: [CheckboxComponent, ToggleComponent],
})
export class PaTogglesModule {}
