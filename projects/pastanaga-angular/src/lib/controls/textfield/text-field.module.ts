import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeprectedInputComponent } from './input/deprected-input.component';
import { DeprecatedSelectComponent } from './select/deprecated-select.component';
import { PaIconModule } from '../../icon/icon.module';
import { PaPopupModule } from '../../popup/popup.module';
import { PaDropdownModule } from '../../dropdown/dropdown.module';
import { DeprecatedTextareaComponent } from './textarea/deprecated-textarea.component';

@NgModule({
    declarations: [DeprecatedSelectComponent, DeprectedInputComponent, DeprecatedTextareaComponent],
    imports: [CommonModule, PaIconModule, PaDropdownModule, PaPopupModule],
    exports: [DeprecatedSelectComponent, DeprectedInputComponent, DeprecatedTextareaComponent],
})
export class PaTextFieldModule {}
