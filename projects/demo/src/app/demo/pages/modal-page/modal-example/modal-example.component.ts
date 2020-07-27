import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { IModal, ModalComponent } from '../../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './modal-example.component.html',
    styleUrls: ['./modal-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalExampleComponent implements IModal {
    @ViewChild(ModalComponent, { static: true }) modal: ModalComponent | undefined;
}
