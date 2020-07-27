import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';

@Component({
    selector: 'pa-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent extends BaseModalComponent implements AfterViewInit {
    ngAfterViewInit() {
        if (!!this.ref) {
            this.ref.config.withCloseButton = true;
        }
        super.ngAfterViewInit();
    }
}
