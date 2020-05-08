import { ChangeDetectionStrategy, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IDialog } from './base-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { detectChanges } from '../common/utils';

@Component({
    selector: 'pa-basic-confirm-dialog',
    templateUrl: './basic-confirm-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicConfirmDialogComponent implements IDialog {
    @ViewChild(ConfirmDialogComponent, {static: true}) dialog: ConfirmDialogComponent | undefined;

    title = '';
    description = '';

    constructor(private cdr: ChangeDetectorRef) {
        let count = 0;
        if (!this.initContent()) {
            const interval = window.setInterval(() => {
                count += 1;
                if (this.initContent() || count > 5) {
                    window.clearInterval(interval);
                }
            }, 200);
        }
    }

    initContent(): boolean {
        if (!this.dialog) {
            return false;
        } else {
            if (!!this.dialog.ref) {
                this.title = this.dialog.ref['title'];
                this.description = this.dialog.ref['description'];
                detectChanges(this.cdr);
            }
            return true;
        }
    }
}
