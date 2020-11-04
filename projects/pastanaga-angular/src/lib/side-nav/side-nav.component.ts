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
    OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { markForCheck } from '../common';
import { PastanagaService } from '../pastanaga.service';
import { SideNavItemComponent } from './side-nav-item.component';

@Component({
    selector: 'pa-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit, AfterContentInit {
    @Input()
    get inverted(): boolean {
        return this._inverted;
    }
    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
    }
    @Input()
    get visible(): boolean {
        return !!this._visible;
    }
    set visible(value: boolean) {
        this._visible = coerceBooleanProperty(value);
    }
    @Input() toggle?: Subject<boolean>;
    @ViewChild('navBar', { read: ElementRef }) navBar?: ElementRef;
    @ViewChild('tabletOverlay', { read: ElementRef }) tabletOverlay?: ElementRef;
    @ContentChildren(SideNavItemComponent, { descendants: true }) contentChild!: QueryList<SideNavItemComponent>;
    _inverted = false;
    _visible = false;
    _mode?: string;
    readonly closeNavBarDuration = 1000;
    terminator: Subject<void> = new Subject<void>();
    constructor(private paService: PastanagaService, private cdr: ChangeDetectorRef, private renderer: Renderer2) {
        this.paService.breakpoint.currentMode.pipe(takeUntil(this.terminator)).subscribe((mode) => {
            this._visible = mode === 'desktop';
            this._mode = mode;
            markForCheck(this.cdr);
        });
    }
    ngOnInit() {
        this.toggle?.subscribe((toggle) => {
            if (this._mode !== 'desktop') {
                if (toggle) {
                    this._visible = toggle;
                    markForCheck(this.cdr);
                    // wait for ViewChildren rendering
                    setTimeout(() => {
                        this.addClass(this.navBar, 'animated');
                        this.addClass(this.tabletOverlay, 'opened');
                    });
                } else {
                    this.addClass(this.tabletOverlay, 'closing');
                    this.addClass(this.navBar, 'closing');
                    // wait for animation ends
                    setTimeout(() => {
                        this._visible = toggle;
                        markForCheck(this.cdr);
                    }, this.closeNavBarDuration);
                }
            }
        });
    }
    ngAfterContentInit() {
        this.contentChild.forEach((child) => {
            child.inverted = this.inverted;
        });
    }

    closeSideNav() {
        this.toggle?.next(false);
    }

    addClass(element: ElementRef | undefined, cssClass: string) {
        if (!!element?.nativeElement) {
            this.renderer.addClass(element.nativeElement, cssClass);
        }
    }
}
