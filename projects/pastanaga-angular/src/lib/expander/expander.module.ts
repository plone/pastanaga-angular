import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaButtonModule } from '../button/button.module';
import { ExpanderHeaderDirective, ExpanderBodyDirective, ExpanderHeaderSideBlockDirective } from './expander.directive';
import { ExpanderComponent } from './expander.component';

const COMPONENTS = [
    ExpanderComponent,
    ExpanderHeaderDirective,
    ExpanderBodyDirective,
    ExpanderHeaderSideBlockDirective,
];

@NgModule({
    imports: [CommonModule, PaButtonModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaExpanderModule {}
