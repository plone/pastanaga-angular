import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '../../../../../../pastanaga-angular/src';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { DialogImageExampleComponent } from './dialog-image-example/dialog-image-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';

@Component({
    templateUrl: './modal-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPageComponent {
    dialogTemplate = `<pa-dialog>
    <pa-modal-title>Dialog title</pa-modal-title>
    <pa-modal-description>Dialog description</pa-modal-description>
    <pa-modal-footer>
        <pa-button kind="secondary" (click)="modal.close('from secondary')">Secondary CTA</pa-button>
        <pa-button kind="primary" (click)="modal.close('from primary')">Primary CTA</pa-button>
    </pa-modal-footer>
</pa-dialog>`;
    dialogComponent = `@Component({
    templateUrl: './dialog-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExampleComponent {
    constructor(public modal: ModalRef) {}
}`;
    callerComponent = `import { ModalService } from 'pastanaga-angular';

export class CallerComponent {
    constructor(
        private modalService: ModalService,
    ) {}

    open() {
        this.modalService.openModal(DialogExampleComponent);
    }
}`;
    customModalComponent = `@Component({
    selector: 'my-own-modal',
    templateUrl: './own-modal.component.html',
    styleUrls: ['./own-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class OwnModalComponent extends BaseModalComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }
}`;
    customModalTemplate = `<div class="pa-modal-backdrop"
     tabindex="0"
     #modalContainer
     [class.pa-modal-blocking]="config.blocking"
     (click)="outsideClick($event)">
    <dialog class="pa-modal my-own-modal-style"
            role="dialog"
            [class.in]="!closing"
            [class.out]="closing">
        <header class="pa-modal-header">
            <h1>
                <ng-content select="pa-modal-title"></ng-content>
            </h1>
        </header>
        <ng-content select="pa-modal-content"></ng-content>
        <ng-content select="pa-modal-footer"></ng-content>
    </dialog>
</div>`;
    openModalConfig = `export class CallerComponent {
    open() {
        this.modalService.openModal(DialogExampleComponent, new ModalConfig({blocking: false}));
    }
}`;
    modalCloseButtonSetup = `export class ModalComponent extends BaseModalComponent implements AfterViewInit {
    ngAfterViewInit() {
        if (!!this.ref) {
            this.ref.config.withCloseButton = true;
        }
        super.ngAfterViewInit();
    }
}
`;
    collectDataOnClose = `export class CallerComponent {
    open() {
        this.modalService.openModal(DialogExampleComponent).onClose.subscribe(data => console.log('Modal closed', data));
    }
}`;
    closingProgrammatically = `export class SomeDialogComponent {
    closeDialog() {
        this.modal.close({whatever: true, answer: 42});
    }
}`;
    passingDataToModal = `export class CallerComponent {
    open() {
        const modalRef = this.modalService.openModal(SomeDialogComponent, {
            data = { document: myDoc, user: myUser }
        });
    }
}`;
    accessingModalData = `export class SomeDialogComponent implements IModal {
    constructor(private dialog: ModalRef) {}

    ngOnInit() {
        this.document = this.dialog.data?.document;
        this.user = this.dialog.data?.user;
    }
}`;
    onEnterBinding = `export class SomeDialogComponent implements IModal {
    ngOnInit() {
        this.modal.onEnter = this.edit.bind(this);
    }

    edit() {
        this.modal.close({whatever: true, answer: 42});
    }
}`;

    constructor(private modalService: ModalService) {}

    openDialog() {
        this.modalService.openModal(DialogExampleComponent).onClose.subscribe(console.log);
    }

    openImageDialog() {
        this.modalService.openModal(DialogImageExampleComponent).onClose.subscribe(console.log);
    }

    openModal() {
        this.modalService.openModal(ModalExampleComponent).onClose.subscribe(console.log);
    }
}
