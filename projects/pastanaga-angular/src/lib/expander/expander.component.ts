import {
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    AfterViewInit,
    ContentChild,
    Input,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import { ExpanderBodyDirective } from './expander.directive';
import { markForCheck } from '../common';
import { BreakpointObserver } from '../breakpoint-observer/breakpoint.observer';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export const transitionDuration = 160;

@Component({
    selector: 'pa-expander',
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpanderComponent implements AfterViewInit, OnDestroy {
    @Input() set contentLoaded(value: any) {
        this.updateContentHeight();
    }
    @Input()
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    private _disabled = false;

    @Input()
    set card(value: boolean) {
        this._card = coerceBooleanProperty(value);
    }
    get card() {
        return this._card;
    }
    private _card = false;

    @ContentChild(ExpanderBodyDirective, { read: ElementRef }) expanderContent?: ElementRef;

    terminator = new Subject();
    expanded = true;
    contentHidden = false;

    constructor(
        private elementRef: ElementRef,
        private breakpoint: BreakpointObserver,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngAfterViewInit() {
        this.updateContentHeight();
        if (this.card) this.toggleExpand();
    }

    ngOnDestroy() {
        this.terminator.next();
        this.terminator.complete();
    }

    onTitleClick() {
        if (!this.card) this.toggleExpand();
    }

    toggleExpand() {
        // when expanded, we collapse directly and hide content after the transition delay
        if (this.expanded) {
            this.expanded = false;
            setTimeout(() => {
                this.contentHidden = true;
                markForCheck(this.cdr);
            }, transitionDuration);
        } else {
            // when collapsed, we remove "display: none" before expanding the panel so the animation is visible
            this.contentHidden = false;
            this.updateContentHeight();
            setTimeout(() => {
                this.expanded = true;
                markForCheck(this.cdr);
            }, 0);
        }
    }

    private updateContentHeight() {
        setTimeout(() => {
            this.elementRef.nativeElement.style.setProperty(
                '--contentHeight',
                `${this.expanderContent?.nativeElement.getBoundingClientRect().height}px`,
            );
        });
    }
}
