import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
} from '@angular/core';
import { ExpanderBodyDirective } from './expander.directive';
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
        this._expanded = false;
        this.contentHidden = true;
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

    @Input()
    set expanded(value: any) {
        if (coerceBooleanProperty(value)) {
            this.expand();
        } else {
            this.collapse();
        }
    }
    get expanded() {
        return this._expanded;
    }
    private _expanded = true;

    @Input()
    set emitOnly(value: any) {
        this._emitOnly = coerceBooleanProperty(value);
    }
    get emitOnly() {
        return this._emitOnly;
    }
    private _emitOnly = false;

    @Output() toggleExpander: EventEmitter<void> = new EventEmitter();

    @ContentChild(ExpanderBodyDirective, { read: ElementRef }) expanderContent?: ElementRef;
    @ViewChild('sideBlock', { read: ElementRef }) sideBlock?: ElementRef;

    terminator = new Subject<void>();
    contentHidden = false;

    hasSideBlock = false;

    constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.hasSideBlock = !!this.sideBlock && this.sideBlock.nativeElement.children.length > 0;
        this.updateContentHeight();
        this.cdr.markForCheck();
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
        if (!this.emitOnly) {
            if (this.expanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }
        this.toggleExpander.emit();
    }

    private collapse() {
        // when expanded, we collapse directly and hide content after the transition delay
        this._expanded = false;
        setTimeout(() => {
            this.contentHidden = true;
            markForCheck(this.cdr);
        }, transitionDuration);
    }

    private expand() {
        // when collapsed, we remove "display: none" before expanding the panel so the animation is visible
        this.contentHidden = false;
        this.updateContentHeight();
        setTimeout(() => {
            this._expanded = true;
            markForCheck(this.cdr);
        }, 0);
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
