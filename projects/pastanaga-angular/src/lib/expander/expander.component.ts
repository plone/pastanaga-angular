import {
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    AfterViewInit,
    ContentChild,
    Input,
    ChangeDetectorRef,
    OnDestroy, ViewChild,
} from '@angular/core';
import { ExpanderBodyDirective, ExpanderHeaderSideBlockDirective } from './expander.directive';
import { markForCheck } from '../common';
import { Subject } from 'rxjs';
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
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    private _disabled = false;

    @Input()
    set card(value: any) {
        this._card = coerceBooleanProperty(value);
    }
    get card() {
        return this._card;
    }
    private _card = false;

    @Input()
    set buttonOnlyToggle(value: any) {
        this._buttonOnlyToggle = coerceBooleanProperty(value);
    }
    get buttonOnlyToggle() {
        return this._buttonOnlyToggle;
    }
    private _buttonOnlyToggle = false;

    @ContentChild(ExpanderBodyDirective, { read: ElementRef }) expanderContent?: ElementRef;
    @ViewChild('sideBlock', { read: ElementRef }) sideBlock?: ElementRef;

    terminator = new Subject<void>();
    expanded = true;
    contentHidden = false;

    hasSideBlock = false;

    constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.hasSideBlock = !!this.sideBlock && this.sideBlock.nativeElement.children.length > 0;
        this.updateContentHeight();
        if (this.card) {
            this.toggleExpand();
        }
    }

    ngOnDestroy() {
        this.terminator.next();
        this.terminator.complete();
    }

    onTitleClick() {
        if (!this.buttonOnlyToggle) {
            this.toggleExpand();
        }
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
