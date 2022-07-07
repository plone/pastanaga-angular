import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ModalContentDirective,
    ModalDescriptionDirective,
    ModalFooterDirective,
    ModalImageDirective,
    ModalTitleDirective,
} from './modal.directive';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ModalAdvancedComponent } from './modal-advanced/modal-advanced.component';
import { PaButtonModule } from '../button';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PaScrollModule } from '../scroll';

const COMPONENTS_AND_DIRECTIVES = [
    ConfirmationDialogComponent,
    ModalDialogComponent,
    ModalAdvancedComponent,
    ModalTitleDirective,
    ModalDescriptionDirective,
    ModalContentDirective,
    ModalImageDirective,
    ModalFooterDirective,
];

@NgModule({
    imports: [CommonModule, PaButtonModule, PaScrollModule],
    declarations: COMPONENTS_AND_DIRECTIVES,
    exports: COMPONENTS_AND_DIRECTIVES,
})
export class PaModalModule {}
