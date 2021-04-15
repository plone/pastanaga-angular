import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaButtonModule } from '../button/button.module';
import { PaTranslateModule } from '../translate/translate.module';
import { ExpanderHeaderDirective, ExpanderBodyDirective, ExpanderHeaderSideBlockDirective } from './expander.directive';
import { ExpanderComponent } from './expander.component';

const COMPONENTS = [
    ExpanderComponent,
    ExpanderHeaderDirective,
    ExpanderBodyDirective,
    ExpanderHeaderSideBlockDirective,
];

@NgModule({
    imports: [CommonModule, PaButtonModule, PaTranslateModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaExpanderModule {}
