import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TranslateModule } from '../translate/translate.module';
import {
    ConfirmActionsDirective,
    ConfirmDescriptionDirective, ConfirmTitleDirective,
    DialogFooterDirective,
    DialogImageDirective,
    DialogTitleDirective
} from './dialog.directives';
import { DialogComponent } from './dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { BasicConfirmDialogComponent } from './basic-confirm-dialog.component';

const COMPONENTS_AND_DIRECTIVES = [
    DialogComponent,
    DialogFooterDirective,
    DialogImageDirective,
    DialogTitleDirective,
    ConfirmDialogComponent,
    ConfirmTitleDirective,
    ConfirmDescriptionDirective,
    ConfirmActionsDirective,
    BasicConfirmDialogComponent,
];

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
        TranslateModule,
    ],
    declarations: COMPONENTS_AND_DIRECTIVES,
    exports: COMPONENTS_AND_DIRECTIVES,
})
export class DialogModule {}
