import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseDialogComponent } from './base-dialog.component';

@Component({
    selector: 'pa-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent extends BaseDialogComponent implements OnInit, AfterContentInit {
    @ViewChild('confirmActions', {read: ElementRef, static: true}) confirmActions?: ElementRef;

    _hasCustomActions = false;

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
        this._hasCustomActions = !!this.confirmActions && this.confirmActions.nativeElement.children.length > 0;
    }
}
