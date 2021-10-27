import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ViewChild,
    ChangeDetectorRef,
    ElementRef,
    Renderer2,
    Output,
    EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import { markForCheck } from '../common';
import { SideNavItemComponent } from './side-nav-item.component';

@Component({
    selector: 'pa-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements AfterContentInit {
    @Input()
    get inverted(): boolean {
        return this._inverted;
    }
    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
    }

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

    @ViewChild('navBar', { read: ElementRef }) navBar?: ElementRef;
    @ViewChild('tabletOverlay', { read: ElementRef }) tabletOverlay?: ElementRef;
    @ContentChildren(SideNavItemComponent, { descendants: true }) contentChild!: QueryList<SideNavItemComponent>;

    private _inverted = false;
    private _visible = true;
    private _mode = 'desktop';

    // we need to avoid animation when mode changed (from desktop to tablet for example)
    modeChanged = false;
    readonly closeNavBarDuration = 1000;
    terminator: Subject<void> = new Subject<void>();
    constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

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
    ngAfterContentInit() {
        this.contentChild.forEach((child) => {
            child.inverted = this.inverted;
        });
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
