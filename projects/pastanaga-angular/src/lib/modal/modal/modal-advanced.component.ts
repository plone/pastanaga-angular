import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';

@Component({
    selector: 'pa-modal-advanced',
    templateUrl: './modal-advanced.component.html',
    styleUrls: ['./modal-advanced.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ModalAdvancedComponent extends BaseModalComponent implements AfterViewInit {
    @ViewChild('footer', { read: ElementRef }) footer?: ElementRef;

    hasFooter = false;

    ngAfterViewInit() {
        super.ngAfterViewInit();

        this.hasFooter = !!this.footer && this.footer.nativeElement.children.length > 0;

        this.setFocus();
        this.refresh();
    }
}
