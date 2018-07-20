import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from './input.component';
import { SelectComponent } from './select.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
    ],
    declarations: [
        InputComponent,
        SelectComponent,
    ],
    exports: [
        InputComponent,
        SelectComponent,
    ],
})
export class TextFieldModule {
}
