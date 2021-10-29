import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { getPositionedParent, PositionStyle } from '../common';
import { MARGIN, PopupComponent } from './popup.component';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { PopupService } from './popup.service';

@Directive({
    selector: '[paPopup]',
    exportAs: 'paPopupRef',
})
export class PopupDirective implements OnInit {
    @Input() paPopup?: PopupComponent;
    @Input()
    get popupPosition(): PositionStyle | undefined {
        return this._popupPosition;
    }
    set popupPosition(value: PositionStyle | undefined) {
        this._popupPosition = value;
        this.paPopup?.setPopupPosition(value);
    }
    @Input() set popupMargin(value: number) {
        this._margin = coerceNumberProperty(value);
    }
    @Input()
    get popupOnRight(): boolean {
        return this._popupOnRight;
    }
    set popupOnRight(value: boolean) {
        this._popupOnRight = coerceBooleanProperty(value);
    }
    @Input()
    get popupOnTop(): boolean {
        return this._popupOnTop;
    }
    set popupOnTop(value: boolean) {
        this._popupOnTop = coerceBooleanProperty(value);
    }
    @Input()
    get sameWidth(): boolean {
        return this._sameWidth;
    }
    set sameWidth(value: boolean) {
        this._sameWidth = coerceBooleanProperty(value);
    }
    @Input()
    get popupDisabled(): boolean {
        return this._disabled;
    }
    set popupDisabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    @Input()
    set openOnly(value: boolean) {
        this._openOnly = coerceBooleanProperty(value);
    }
    get openOnly() {
        return this._openOnly;
    }

    private _rootParent?: HTMLElement;
    private _disabled = false;
    private _openOnly = false;

    private _popupOnRight = false;
    private _popupOnTop = false;
    private _sameWidth = false;
    private _margin = MARGIN;
    private _popupPosition?: PositionStyle;

    constructor(private element: ElementRef, private service: PopupService, private renderer: Renderer2) {}

    ngOnInit() {
        this.element.nativeElement.setAttribute('aria-haspopup', true);

        this.paPopup?.onClose.subscribe(() => this.removeActiveStateFromParentButton());
    }

    @HostListener('click', ['$event'])
    onClick($event: MouseEvent) {
        if (!this._disabled) {
            this.toggle();
        }
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    toggle() {
        if (!!this.paPopup) {
            if (this.paPopup.isDisplayed && !this.openOnly) {
                this.paPopup.close();
            } else {
                const position: PositionStyle = !!this.popupPosition ? this.popupPosition : this.getPosition();
                this.paPopup.show(position);
                this.addActiveStateOnParentButton();
            }
        }
    }

    getPosition(): PositionStyle {
        const directiveElement: HTMLElement = this.element.nativeElement;
        const rect = directiveElement.getBoundingClientRect();

        if (!this._rootParent) {
            this._rootParent = getPositionedParent(directiveElement.parentElement || directiveElement);
        }
        const rootRect = this._rootParent.getBoundingClientRect();
        const top = rect.bottom - rootRect.top + this._rootParent.scrollTop;
        const bottom = window.innerHeight - rect.top - window.pageYOffset;

        const position: PositionStyle = {
            position: 'absolute',
            top: !this.popupOnTop ? top + this._margin + 'px' : undefined,
            bottom: this.popupOnTop ? bottom + this._margin + 'px' : undefined,
            width: this._sameWidth ? rect.right - rect.left + 'px' : undefined,
        };

        if (this._popupOnRight) {
            position.left = Math.min(rect.left - rootRect.left, window.innerWidth - 240) + 'px';
        } else {
            position.right = Math.min(rootRect.right - rect.right, window.innerWidth - 240) + 'px';
        }

        return position;
    }

    private addActiveStateOnParentButton() {
        if (this.element.nativeElement.tagName.toLowerCase() === 'pa-button') {
            this.renderer.addClass(this.element.nativeElement.children[0], 'pa-active');
        }
    }

    private removeActiveStateFromParentButton() {
        if (this.element.nativeElement.tagName.toLowerCase() === 'pa-button') {
            this.renderer.removeClass(this.element.nativeElement.children[0], 'pa-active');
        }
    }
}
