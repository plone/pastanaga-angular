import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { SelectComponent } from './select.component';
import { TextareaComponent } from './textarea.component';
import { TranslateModule } from '../translate/translate.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
    ],
    declarations: [
        InputComponent,
        SelectComponent,
        TextareaComponent,
    ],
    exports: [
        InputComponent,
        SelectComponent,
        TextareaComponent,
    ],
})
export class TextFieldModule {
}
