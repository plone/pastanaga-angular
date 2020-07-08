import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { PaIconModule } from '../../icon/icon.module';
import { PaPopupModule } from '../../popup/popup.module';
import { PaDropdownModule } from '../../dropdown/dropdown.module';
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
    declarations: [SelectComponent, InputComponent, TextareaComponent],
    imports: [CommonModule, PaIconModule, PaDropdownModule, PaPopupModule],
    exports: [SelectComponent, InputComponent, TextareaComponent],
})
export class PaTextFieldModule {}
