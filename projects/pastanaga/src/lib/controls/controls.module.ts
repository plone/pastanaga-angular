import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SvgModule } from '../svg/module';

@NgModule({
    imports: [
        CommonModule,
        SvgModule,
    ],
    declarations: [
        CheckboxComponent,
    ],
    exports: [
        CheckboxComponent,
    ]
})
export class ControlsModule {
}
