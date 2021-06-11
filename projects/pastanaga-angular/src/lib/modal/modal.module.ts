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
import { ModalAdvancedComponent } from './modal/modal-advanced.component';
import { PaButtonModule } from '../button/button.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PaTranslateModule } from '../translate/translate.module';

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
    imports: [CommonModule, PaButtonModule, PaTranslateModule],
    declarations: COMPONENTS_AND_DIRECTIVES,
    exports: COMPONENTS_AND_DIRECTIVES,
})
export class PaModalModule {}
