import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogFooterDirective, DialogImageDirective, DialogTitleDirective } from './dialog.directives';
import { DialogComponent } from './dialog.component';
import { ButtonModule } from '../button/button.module';

const COMPONENTS_AND_DIRECTIVES = [
    DialogComponent,
    DialogFooterDirective,
    DialogImageDirective,
    DialogTitleDirective,
];

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
    ],
    declarations: COMPONENTS_AND_DIRECTIVES,
    exports: COMPONENTS_AND_DIRECTIVES,
})
export class DialogModule {}
