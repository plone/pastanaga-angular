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
        <pa-button kind="secondary" (click)="modal?.close('from secondary')">Secondary CTA</pa-button>
        <pa-button kind="primary" (click)="modal?.close('from primary')">Primary CTA</pa-button>
    </pa-modal-footer>
</pa-dialog>`;
    dialogComponent = `@Component({
    templateUrl: './dialog-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExampleComponent implements IModal {
    @ViewChild(DialogComponent, { static: true }) modal: DialogComponent | undefined;
}`;
    callerComponent = `import { PastanagaService } from 'pastanaga-angular';

export class CallerComponent {
    constructor(
        private pastanaga: PastanagaService,
    ) {}

    open() {
        this.pastanaga.modalService.openModal(DialogExampleComponent);
    }
}`;
    customModalComponent = `@Component({
    selector: 'my-own-modal',
    templateUrl: './own-modal.component.html',
    styleUrls: ['./own-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class OwnModalComponent extends BaseModalComponent implements OnInit, AfterContentInit {

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();
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
