import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { fromEvent, Subject } from 'rxjs';
import { auditTime, filter, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

/**
 * Highly inspired by CdkTextareaAutosize
 * this directive allows to automatically adjust a paTextarea height according to its content.
 */
@Directive({
    selector: '[paTextareaAutoHeight]',
})
export class PaTextareaAutoHeightDirective implements AfterViewInit, OnDestroy {
    @Input('paTextareaAutoHeight')
    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: any) {
        value = coerceBooleanProperty(value);
        // Only act if the actual value changed.
        if (this._enabled !== value) {
            this._enabled = value;
            this._toggleAutoHeight();
        }
    }

    @Input('paTextareaMaxHeight')
    set maxHeight(value: number | null | undefined) {
        this._maxHeight = value;
        if (this._enabled) {
            this.resizeToFitContent();
        }
    }

    @Input() formControl?: FormControl;

    /** Class that should be applied to the textarea while it's being measured. */
    readonly _measuringClass: string;
    readonly _textarea: HTMLTextAreaElement;
    readonly _heightSafetynet = 4;
    private _previousHeight = 0;
    private _previousValue?: string;

    private _maxHeight: number | null | undefined;
    private _enabled = true;
    private _autoSizingChanged$ = new Subject<void>();

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _platform: Platform,
        private _ngZone: NgZone,
        private renderer: Renderer2,
    ) {
        this._textarea = this._elementRef.nativeElement as HTMLTextAreaElement;
        this._measuringClass = _platform.FIREFOX
            ? 'pa-textarea-autosize-measuring-firefox'
            : 'pa-textarea-autosize-measuring';
    }

    ngAfterViewInit() {
        this._toggleAutoHeight();
    }

    ngOnDestroy() {
        this._autoSizingChanged$.next();
        this._autoSizingChanged$.complete();
    }

    /**
     * Resize the textarea to fit its content.
     */
    resizeToFitContent() {
        let nextHeight = this._measureAutoHeight();
        if (this._maxHeight && nextHeight > this._maxHeight) {
            nextHeight = this._maxHeight;
        }
        if (nextHeight !== this._previousHeight) {
            this.renderer.setStyle(this._textarea, 'height', `${nextHeight}px`);
            this._previousHeight = nextHeight;
        }
    }

    private _measureAutoHeight() {
        // Reset the textarea height to auto using the measuring class.
        // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
        // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
        // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
        // need to be removed temporarily.
        const placeholderCache = this._textarea.placeholder;
        this.renderer.addClass(this._textarea, this._measuringClass);
        this._textarea.placeholder = '';

        // Use the scrollHeight to know how big the textarea *would* be if fit its entire value.
        // make sure textarea won't be scrollable afterward adding an offset of 4px;
        const height = this._textarea.scrollHeight + this._heightSafetynet;
        this.renderer.removeClass(this._textarea, this._measuringClass);
        this._textarea.placeholder = placeholderCache;
        return height;
    }

    private _toggleAutoHeight() {
        if (this._enabled) {
            this.resizeToFitContent();
            this._trackChanges();
        } else {
            this._autoSizingChanged$.next();
            this.renderer.removeStyle(this._textarea, 'height');
        }
    }

    private _trackChanges() {
        this._ngZone.runOutsideAngular(() => {
            // resize events
            fromEvent(window, 'resize')
                .pipe(auditTime(16), takeUntil(this._autoSizingChanged$))
                .subscribe(() => this.resizeToFitContent());
            // input
            fromEvent(this._textarea, 'input')
                .pipe(takeUntil(this._autoSizingChanged$))
                .subscribe(() => {
                    const value = this._textarea.value;
                    if (value !== this._previousValue) {
                        this.resizeToFitContent();
                        this._previousValue = value;
                    }
                });
            // value changed without input event
            if (this.formControl) {
                this.formControl.valueChanges
                    .pipe(
                        filter((val) => val !== this._previousValue),
                        takeUntil(this._autoSizingChanged$),
                    )
                    .subscribe(() => {
                        this.resizeToFitContent();
                        this._previousValue = this._textarea.value;
                    });
            }
        });
    }
}
