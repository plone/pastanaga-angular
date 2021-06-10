import { Component, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { ConfirmationData, ModalRef } from '../modal.model';

@Component({
    selector: 'pa-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent extends BaseModalComponent implements AfterViewInit {
    constructor(public ref: ModalRef<ConfirmationData>, protected cdr: ChangeDetectorRef) {
        super(ref, cdr);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();

        this.setFocus();
        this.refresh();
    }
}
