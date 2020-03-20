import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IDialog } from './base-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
    selector: 'pa-basic-confirm-dialog',
    templateUrl: './basic-confirm-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicConfirmDialogComponent implements IDialog, OnInit {
    @ViewChild(ConfirmDialogComponent, {static: true}) dialog: ConfirmDialogComponent | undefined;

    title = '';
    description = '';

    ngOnInit(): void {
        if (!!this.dialog && !!this.dialog.ref) {
            this.title = this.dialog.ref['title'];
            this.description = this.dialog.ref['description'];
        }
    }
}
