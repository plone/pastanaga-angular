import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    NgZone,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { ModalRef } from '../modal.model';
import { TRANSITION_DURATION } from '../../common';
import { BreakpointObserver } from '../../breakpoint-observer/breakpoint.observer';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'pa-modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ModalDialogComponent extends BaseModalComponent implements AfterViewInit, OnDestroy {
    @ViewChild('dialogContainer', { read: ElementRef }) dialogContainer?: ElementRef;
    @ViewChild('header', { read: ElementRef }) header?: ElementRef;
    @ViewChild('image', { read: ElementRef }) image?: ElementRef;
    @ViewChild('description', { read: ElementRef }) description?: ElementRef;
    @ViewChild('footer', { read: ElementRef }) footer?: ElementRef;

    hasImage = false;
    hasDescription = false;
    hasFooter = false;

    private _headerHeightSettingDelay = TRANSITION_DURATION.moderate;
    dialogHeightHasChanged$ = new BehaviorSubject<number>(0);
    observer: ResizeObserver = new ResizeObserver((entries) => {
        this.ngZone.runOutsideAngular(() => {
            this.dialogHeightHasChanged$.next(entries[0].contentRect.top);
        });
    });

    constructor(
        public ref: ModalRef,
        protected cdr: ChangeDetectorRef,
        private element: ElementRef,
        private breakpoint: BreakpointObserver,
        private ngZone: NgZone,
        @Inject(DOCUMENT) private document: any,
    ) {
        super(ref, cdr);
        this.breakpoint.currentMode
            .pipe(takeUntil(this._terminator))
            .subscribe(
                (mode) =>
                    (this._headerHeightSettingDelay =
                        mode === 'mobile' ? TRANSITION_DURATION.slow : TRANSITION_DURATION.moderate),
            );
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
        }, this._headerHeightSettingDelay);

        // updating dialog top offset on dialog height change
        this.observer.observe(this.dialogContainer?.nativeElement);
        this.dialogHeightHasChanged$.pipe(takeUntil(this._terminator)).subscribe(() => {
            const dialogRect = this.dialogContainer?.nativeElement.getBoundingClientRect();
            this.document.documentElement.style.setProperty('--containerTranslateY', `${Math.ceil(dialogRect.top)}`);
        });
    }

    ngOnDestroy() {
        this.observer.unobserve(this.dialogContainer?.nativeElement);
    }
}
