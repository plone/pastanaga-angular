import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent, IDialog } from 'pastanaga-angular';

@Component({
    selector: 'some-content',
    templateUrl: './multiple-screens-dialog.component.html',
})
export class MultipleScreensDialogComponent implements IDialog, OnInit {
    @ViewChild(DialogComponent, { static: true }) dialog: DialogComponent | undefined;

    step = 0;

    ngOnInit() {
        if (!!this.dialog) {
            this.dialog.onEnter = this.next.bind(this);
        }
    }

    edit() {
        if (!!this.dialog) {
            this.dialog.close({edition: true});
        }
    }

    next() {
        this.step += 1;
        this.updateDialogState();
    }

    back() {
        this.step -= 1;
        this.updateDialogState();
    }

    private updateDialogState() {
        if (!!this.dialog) {
            this.dialog.presentationMode = this.step > 1;
            this.dialog.displayBackButton = this.step > 0;
            this.dialog.forceSmallImage = this.step > 0;
            this.dialog.totalSteps = this.step > 0 ? 2 : 0;
            this.dialog.activeStep = this.step - 1;
        }
    }
}
