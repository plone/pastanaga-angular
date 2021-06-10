import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';

@Component({
    selector: 'pa-modal-advanced',
    templateUrl: './modal-advanced.component.html',
    styleUrls: ['./modal-advanced.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ModalAdvancedComponent extends BaseModalComponent implements AfterViewInit {
    ngAfterViewInit() {
        super.ngAfterViewInit();

        this.setFocus();
        this.refresh();
    }
}
