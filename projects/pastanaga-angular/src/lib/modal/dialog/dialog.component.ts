import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
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
export class DialogComponent extends BaseModalComponent implements OnInit, AfterContentInit {
    @ViewChild('image', { read: ElementRef, static: true }) image?: ElementRef;
    _hasImage = false;

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();

        this._hasImage = !!this.image && this.image.nativeElement.children.length > 0;
        this.setFocus();
    }
}
