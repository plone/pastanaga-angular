import { AfterContentInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';

@Component({
    selector: 'pa-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent extends BaseModalComponent implements OnInit, AfterContentInit {
    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();
    }
}
