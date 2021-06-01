import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, Input, Output } from '@angular/core';

@Component({
    selector: 'pa-infinite-scroll',
    templateUrl: './infinite-scroll.component.html',
    styleUrls: ['./infinite-scroll.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
    @Input() options = {};

    @Output() reachBottom = new EventEmitter();

    @ViewChild('bottom') bottom?: ElementRef<HTMLElement>;

    get element() {
        return this.host.nativeElement;
    }

    private _observer?: IntersectionObserver;

    constructor(private host: ElementRef) {}

    ngAfterViewInit() {
        const options = {
            root: this.isHostScrollable() ? this.element : null,
            ...this.options,
        };
        if (!!this.bottom) {
            this._observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    this.reachBottom.emit();
                }
            }, options);
            this._observer.observe(this.bottom.nativeElement);
        }
    }

    ngOnDestroy() {
        this._observer?.disconnect();
    }

    private isHostScrollable() {
        const style = window.getComputedStyle(this.element);

        return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
    }
}
