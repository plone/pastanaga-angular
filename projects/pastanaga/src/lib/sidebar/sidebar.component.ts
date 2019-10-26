import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef, EventEmitter,
    HostBinding, HostListener,
    Input,
    OnDestroy,
    OnInit, Output,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { SidebarService } from './sidebar.service';

@Component({
    selector: 'pa-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
    @Input() name?: string;
    @Input() position: 'left' | 'right' = 'left';

    @Input() set unfoldOnHover(value: boolean) { this._unfoldOnHover = coerceBooleanProperty(value); }
    get unfoldOnHover() { return this._unfoldOnHover; }
    private _unfoldOnHover = false;

    @Input() set noBackdrop(value: boolean) { this._noBackdrop = coerceBooleanProperty(value); }
    get noBackdrop() { return this._noBackdrop; }
    private _noBackdrop = false;

    @Input() set foldedWidth(value: number) { this._foldedWidth = coerceNumberProperty(value); }
    get foldedWidth(): number { return this._foldedWidth; }
    private _foldedWidth = 64;

    @Input() set folded(value: boolean) {
        this._folded = coerceBooleanProperty(value);

        const width = `${this._foldedWidth}px`;
        if (this._folded) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', width);
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', width);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', width);
            this.renderer.addClass(this.elementRef.nativeElement, 'folded');
        } else {
            this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'min-width');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'max-width');
            this.renderer.removeClass(this.elementRef.nativeElement, 'folded');
        }
        this.foldedChanged.emit(this._folded);
    }
    get folded(): boolean { return this._folded; }
    private _folded = false;

    @Input() set lockedOpen(value: boolean) {
        this._lockedOpen = coerceBooleanProperty(value);
        if (this._lockedOpen) {
            this.open();
        }
    }
    get lockedOpen(): boolean { return this._lockedOpen; }
    @HostBinding('class.locked-opened')
    private _lockedOpen = false;

    @Output() openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() foldedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostBinding('class.open')
    private isOpen = false;

    @HostBinding('class.animations-enabled')
    private animationsEnabled = false;

    private backdrop: HTMLElement | null = null;

    constructor(
        private elementRef: ElementRef,
        private sidebarService: SidebarService,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        if (!this.name) {
            throw new Error(`'name' input is required`);
        }
        this.sidebarService.register(this.name, this);

        this.setupPosition();
    }

    ngOnDestroy(): void {
        if (!!this.name) {
            this.sidebarService.unregister(this.name);
        }
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        if (this._unfoldOnHover) {
            this.toggleFold();
        }
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        if (this._unfoldOnHover) {
            this.toggleFold();
        }
    }

    toggleOpen() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.isOpen) {
            return;
        }
        this.enableAnimations();
        this.isOpen = true;
        if (!this._noBackdrop) {
            this.showBackdrop();
        }
        this.openedChanged.emit(this.isOpen);
        this.cdr.markForCheck();
    }

    close() {
        if (!this.isOpen) {
            return;
        }
        this.enableAnimations();
        this.isOpen = false;
        if (!this._noBackdrop) {
            this.hideBackdrop();
        }
        this.openedChanged.emit(this.isOpen);
        this.cdr.markForCheck();
    }

    toggleFold() {
        this.folded = !this._folded;
        this.enableAnimations();
        this.foldedChanged.emit(this._folded);
        this.cdr.markForCheck();
    }

    private setupPosition() {
        if (this.position === 'left') {
            this.renderer.addClass(this.elementRef.nativeElement, 'left-positioned');
        } else {
            this.renderer.addClass(this.elementRef.nativeElement, 'right-positioned');
        }
    }

    private enableAnimations() {
        if (this.animationsEnabled) {
            return;
        }
        this.animationsEnabled = true;
        this.cdr.markForCheck();
    }

    private showBackdrop() {
        this.backdrop = this.renderer.createElement('div');
        if (!this.backdrop) {
            throw new Error(`backdrop creation failed`);
        }
        this.backdrop.classList.add('pa-sidebar-overlay');
        this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.backdrop);
        this.backdrop.addEventListener('click', () => this.close());
        this.cdr.markForCheck();
    }

    private hideBackdrop() {
        if (!!this.backdrop && !!this.backdrop.parentNode) {
            this.backdrop.parentNode.removeChild(this.backdrop);
            this.backdrop = null;
            this.cdr.markForCheck();
        }
    }
}
