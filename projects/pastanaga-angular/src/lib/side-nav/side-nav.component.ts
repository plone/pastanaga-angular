import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ContentChildren,
    QueryList,
    ViewChild,
    ChangeDetectorRef,
    ElementRef,
    Renderer2,
    Output,
    EventEmitter, AfterViewInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { markForCheck, TRANSITION_DURATION } from '../common';
import { SideNavItemComponent } from './side-nav-item/side-nav-item.component';

@Component({
    selector: 'pa-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements AfterViewInit {
    @Input()
    get visible(): boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        if (this._mode !== 'desktop' && !this.modeChanged) {
            this.triggerAnimation(value);
        } else {
            this.modeChanged = false;
            this._visible = coerceBooleanProperty(value);
        }
    }

    @Input()
    get mode(): string {
        return this._mode;
    }
    set mode(value: string) {
        this.modeChanged = value !== this._mode;
        this._mode = value;
    }

    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('header', { read: ElementRef }) header?: ElementRef;
    @ViewChild('footer', { read: ElementRef }) footer?: ElementRef;
    @ViewChild('navBar', { read: ElementRef }) navBar?: ElementRef;
    @ViewChild('tabletOverlay', { read: ElementRef }) tabletOverlay?: ElementRef;
    @ContentChildren(SideNavItemComponent, { descendants: true }) contentChild!: QueryList<SideNavItemComponent>;

    private _visible = true;
    private _mode = 'desktop';
    hasHeaderContent = false;
    hasFooterContent = false;

    // we need to avoid animation when mode changed (from desktop to tablet for example)
    modeChanged = false;
    readonly closeNavBarDuration = TRANSITION_DURATION.slow;
    terminator: Subject<void> = new Subject<void>();

    constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        this.hasHeaderContent = !!this.header && this.header.nativeElement.children.length > 1;
        this.hasFooterContent = !!this.footer && this.footer.nativeElement.children.length > 0;
    }

    triggerAnimation(isOpen: boolean) {
        if (isOpen) {
            this._visible = isOpen;
            markForCheck(this.cdr);
            // wait for ViewChildren rendering
            setTimeout(() => {
                this.addClass(this.navBar, 'animated');
                this.addClass(this.tabletOverlay, 'opened');
            });
        } else {
            this.addClass(this.tabletOverlay, 'closed');
            this.addClass(this.navBar, 'closed');
            // wait for animation ends
            setTimeout(() => {
                this._visible = isOpen;
                markForCheck(this.cdr);
            }, this.closeNavBarDuration);
        }
    }

    closeSideNav() {
        this.close.emit();
    }

    addClass(element: ElementRef | undefined, cssClass: string) {
        if (!!element?.nativeElement) {
            this.renderer.addClass(element.nativeElement, cssClass);
        }
    }
}
