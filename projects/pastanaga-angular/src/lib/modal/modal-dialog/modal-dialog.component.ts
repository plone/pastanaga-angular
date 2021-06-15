import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { ModalRef } from '../modal.model';
import { TRANSITION_DURATION } from '../../common';

@Component({
    selector: 'pa-modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ModalDialogComponent extends BaseModalComponent implements AfterViewInit {
    @ViewChild('header', { read: ElementRef }) header?: ElementRef;
    @ViewChild('image', { read: ElementRef }) image?: ElementRef;
    @ViewChild('description', { read: ElementRef }) description?: ElementRef;
    @ViewChild('footer', { read: ElementRef }) footer?: ElementRef;

    hasImage = false;
    hasDescription = false;
    hasFooter = false;

    constructor(public ref: ModalRef, protected cdr: ChangeDetectorRef, private element: ElementRef) {
        super(ref, cdr);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();

        this.hasImage = !!this.image && this.image.nativeElement.children.length > 0;
        this.hasDescription = !!this.description && this.description.nativeElement.children.length > 0;
        this.hasFooter = !!this.footer && this.footer.nativeElement.children.length > 0;

        this.setFocus();
        this.refresh();

        setTimeout(() => {
            this.element.nativeElement.style.setProperty(
                '--headerHeight',
                `${Math.ceil(this.header?.nativeElement.getBoundingClientRect().height)}px`,
            );
        }, TRANSITION_DURATION.moderate);
    }
}
