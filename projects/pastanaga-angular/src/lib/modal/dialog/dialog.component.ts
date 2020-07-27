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
    selector: 'pa-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class DialogComponent extends BaseModalComponent implements AfterViewInit {
    @ViewChild('image', { read: ElementRef }) image?: ElementRef;
    _hasImage = false;

    ngAfterViewInit() {
        super.ngAfterViewInit();

        this._hasImage = !!this.image && this.image.nativeElement.children.length > 0;
        this.setFocus();
        this.refresh();
    }
}
