import {
    AfterContentInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
} from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, mapTo, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { markForCheck, TRANSITION_DURATION } from '../common';
import { DOCUMENT } from '@angular/common';
import { PopupService } from '../popup/popup.service';

export const SCROLL_INACTIVE_HIDING_THRESHOLD = 3000;

@Directive({
    selector: '[paScrollableContainer]',
})
export class ScrollableContainerDirective implements OnInit, AfterContentInit, OnDestroy {
    @Output() resize: EventEmitter<void> = new EventEmitter();

    private _terminator = new Subject<void>();
    private _scrollActive = false;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private element: ElementRef,
        private renderer: Renderer2,
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef,
        private popupService: PopupService,
    ) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(window, 'resize')
                .pipe(throttleTime(TRANSITION_DURATION.fast), takeUntil(this._terminator))
                .subscribe(() => {
                    this.resize.emit();
                });

            const scroll$ = fromEvent(this.element.nativeElement, 'scroll').pipe(
                tap(() => this.popupService.closeAllPopups.next()),
                takeUntil(this._terminator),
            );

            const showScrollbar$ = scroll$.pipe(
                throttleTime(TRANSITION_DURATION.fast),
                mapTo('show'),
                takeUntil(this._terminator),
            );

            const hideScrollbar$ = scroll$.pipe(
                debounceTime(SCROLL_INACTIVE_HIDING_THRESHOLD),
                mapTo('hide'),
                takeUntil(this._terminator),
            );
            merge(showScrollbar$, hideScrollbar$).subscribe((action) => {
                switch (action) {
                    case 'show':
                        this.showScrollbar();
                        break;
                    case 'hide':
                        this.hideScrollbar();
                        break;
                }
            });
        });
    }

    ngAfterContentInit() {
        this.renderer.addClass(this.element.nativeElement, 'pa-scrollable-container');

        if (this.document.getElementsByClassName('pa-scrollable').length === 0) {
            setTimeout(() => {
                // hide scrollbar by default
                this.renderer.addClass(this.element.nativeElement, 'pa-scrollable');
                markForCheck(this.cdr);
            });
        }
    }

    ngOnDestroy() {
        this._terminator.next();
        this._terminator.complete();
    }

    showScrollbar() {
        if (!this._scrollActive) {
            this.renderer.addClass(this.element.nativeElement, 'pa-scrolling');
            this._scrollActive = true;
            markForCheck(this.cdr);
        }
    }

    hideScrollbar() {
        if (this._scrollActive) {
            this.renderer.removeClass(this.element.nativeElement, 'pa-scrolling');
            this._scrollActive = false;
            markForCheck(this.cdr);
        }
    }
}
