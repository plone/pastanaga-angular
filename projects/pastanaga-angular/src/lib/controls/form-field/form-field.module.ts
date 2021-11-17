import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldHintComponent } from './form-field-hint/form-field-hint.component';
import { PaFormControlDirective } from './pa-form-control.directive';
import { PaTranslateModule } from '../../translate';

@NgModule({
    declarations: [FormFieldHintComponent, PaFormControlDirective],
    exports: [FormFieldHintComponent, PaFormControlDirective],
    imports: [CommonModule, PaTranslateModule],
})
export class PaFormFieldModule {}
