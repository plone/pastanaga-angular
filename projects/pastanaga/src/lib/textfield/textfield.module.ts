import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { SelectComponent } from './select.component';
import { TextareaComponent } from './textarea.component';
import { RichtextComponent } from './richtext.component';
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
        RichtextComponent
    ],
    exports: [
        InputComponent,
        SelectComponent,
        TextareaComponent,
        RichtextComponent
    ],
})
export class TextFieldModule {
}
