import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { SelectComponent } from './select.component';
import { TextareaComponent } from './textarea.component';
import { TranslateModule } from '../translate/translate.module';
import { SvgModule } from '../svg/svg.module';
import { PasswordInputComponent } from './password-input/password-input.component';
import { InputIconComponent } from './input-icon/input-icon.component';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ProgressModule } from '../progress/progress.module';
import {NumberInputDirective} from './number-input.directive';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SvgModule,
        ButtonModule,
        TooltipModule,
        ProgressModule,
    ],
    declarations: [
        InputComponent,
        InputIconComponent,
        SelectComponent,
        TextareaComponent,
        PasswordInputComponent,
        NumberInputDirective
    ],
    exports: [
        InputComponent,
        InputIconComponent,
        SelectComponent,
        TextareaComponent,
        PasswordInputComponent,
        NumberInputDirective
    ],
})
export class TextFieldModule {
}
