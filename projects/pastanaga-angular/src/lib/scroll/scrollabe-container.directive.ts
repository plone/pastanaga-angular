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
import { debounceTime, mapTo, takeUntil, throttleTime } from 'rxjs/operators';
import { markForCheck, TRANSITION_DURATION } from '../common';
import { DOCUMENT } from '@angular/common';

export const SCROLL_INACTIVE_FADING_THRESHOLD = 1500;
export const SCROLL_INACTIVE_HIDING_THRESHOLD = 3000;

@Directive({
    selector: '[paScrollableContainer]',
})
export class ScrollableContainerDirective implements OnInit, AfterContentInit, OnDestroy {
    @Output() resize: EventEmitter<void> = new EventEmitter();

    private _terminator = new Subject();
    private _scrollActive = false;
    private _scrollFading = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private element: ElementRef,
        private renderer: Renderer2,
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(window, 'resize')
                .pipe(throttleTime(TRANSITION_DURATION.fast), takeUntil(this._terminator))
                .subscribe(() => {
                    this.resize.emit();
                });

            const scroll$ = fromEvent(this.element.nativeElement, 'scroll').pipe(takeUntil(this._terminator));

            const showScrollbar$ = scroll$.pipe(
                throttleTime(TRANSITION_DURATION.fast),
                mapTo('show'),
                takeUntil(this._terminator),
            );

            const fadeScrollbar$ = scroll$.pipe(
                debounceTime(SCROLL_INACTIVE_FADING_THRESHOLD),
                mapTo('fade'),
                takeUntil(this._terminator),
            );

            const hideScrollbar$ = scroll$.pipe(
                debounceTime(SCROLL_INACTIVE_HIDING_THRESHOLD),
                mapTo('hide'),
                takeUntil(this._terminator),
            );
            merge(showScrollbar$, fadeScrollbar$, hideScrollbar$).subscribe((action) => {
                switch (action) {
                    case 'show':
                        this.showScrollbar();
                        break;
                    case 'fade':
                        this.fadeScrollbar();
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
        if (this._scrollFading) {
            this.renderer.removeClass(this.element.nativeElement, 'pa-fading-scrollbar');
            this._scrollFading = false;
            markForCheck(this.cdr);
        }
    }

    fadeScrollbar() {
        if (!this._scrollFading) {
            this.renderer.addClass(this.element.nativeElement, 'pa-fading-scrollbar');
            this._scrollFading = true;
            markForCheck(this.cdr);
        }
    }

    hideScrollbar() {
        if (this._scrollActive) {
            this.renderer.removeClass(this.element.nativeElement, 'pa-scrolling');
            this.renderer.removeClass(this.element.nativeElement, 'pa-fading-scrollbar');
            this._scrollActive = false;
            markForCheck(this.cdr);
        }
    }
}
