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
import { ModalComponent } from './modal/modal.component';
import { PaButtonModule } from '../button/button.module';

const COMPONENTS_AND_DIRECTIVES = [
    DialogComponent,
    ModalComponent,
    ModalTitleDirective,
    ModalDescriptionDirective,
    ModalContentDirective,
    ModalImageDirective,
    ModalFooterDirective,
];

@NgModule({
    imports: [CommonModule, PaButtonModule],
    declarations: COMPONENTS_AND_DIRECTIVES,
    exports: COMPONENTS_AND_DIRECTIVES,
})
export class PaModalModule {}
