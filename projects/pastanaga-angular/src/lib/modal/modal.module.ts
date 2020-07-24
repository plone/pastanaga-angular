import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaButtonModule } from '../button/button.module';
import { PaTooltipModule } from '../tooltip/tootip.module';
import {
    ModalDescriptionDirective,
    ModalFooterDirective,
    ModalImageDirective,
    ModalTitleDirective,
} from './modal.directive';
import { DialogComponent } from './dialog/dialog.component';

const COMPONENTS_AND_DIRECTIVES = [
    DialogComponent,
    ModalTitleDirective,
    ModalDescriptionDirective,
    ModalImageDirective,
    ModalFooterDirective,
];

@NgModule({
    imports: [CommonModule, PaButtonModule, PaTooltipModule],
    declarations: COMPONENTS_AND_DIRECTIVES,
    exports: COMPONENTS_AND_DIRECTIVES,
})
export class PaModalModule {}
