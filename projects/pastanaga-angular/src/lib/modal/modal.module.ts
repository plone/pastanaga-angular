import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ModalContentDirective,
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
    ModalContentDirective,
    ModalImageDirective,
    ModalFooterDirective,
];

@NgModule({
    imports: [CommonModule],
    declarations: COMPONENTS_AND_DIRECTIVES,
    exports: COMPONENTS_AND_DIRECTIVES,
})
export class PaModalModule {}
