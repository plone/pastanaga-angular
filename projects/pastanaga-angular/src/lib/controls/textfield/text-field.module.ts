import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { PaIconModule } from '../../icon/icon.module';
import { PaPopupModule } from '../../popup/popup.module';
import { PaDropdownModule } from '../../dropdown/dropdown.module';


@NgModule({
    declarations: [SelectComponent, InputComponent],
    imports: [
        CommonModule,
        PaIconModule,
        PaDropdownModule,
        PaPopupModule,
    ],
    exports: [SelectComponent, InputComponent]
})
export class PaTextFieldModule {
}
