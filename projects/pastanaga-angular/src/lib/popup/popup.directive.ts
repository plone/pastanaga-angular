import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { getPositionedParent, PositionStyle } from '../common';
import { POPUP_OFFSET, PopupComponent } from './popup.component';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { PopupService } from './popup.service';

@Directive({
    selector: '[paPopup]',
    exportAs: 'paPopupRef',
})
export class PopupDirective implements OnInit, OnChanges {
    @Input() paPopup?: PopupComponent | null;
    @Input() popupPosition?: PositionStyle;
    @Input()
    set popupVerticalOffset(value: number) {
        this._popupVerticalOffset = coerceNumberProperty(value);
    }
    get popupVerticalOffset() {
        return this._popupVerticalOffset;
    }
    @Input()
    get alignPopupOnLeft(): boolean {
        return this._alignPopupOnLeft;
    }
    set alignPopupOnLeft(value: any) {
        this._alignPopupOnLeft = coerceBooleanProperty(value);
    }
    @Input()
    get popupOnTop(): boolean {
        return this._popupOnTop;
    }
    set popupOnTop(value: any) {
        this._popupOnTop = coerceBooleanProperty(value);
    }
    @Input()
    get popupOnRight(): boolean {
        return this._popupOnRight;
    }
    set popupOnRight(value: any) {
        this._popupOnRight = coerceBooleanProperty(value);
    }
    @Input()
    get sameWidth(): boolean {
        return this._sameWidth;
    }
    set sameWidth(value: any) {
        this._sameWidth = coerceBooleanProperty(value);
    }
    @Input()
    get popupDisabled(): boolean {
        return this._disabled;
    }
    set popupDisabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }
    @Input()
    set openOnly(value: any) {
        this._openOnly = coerceBooleanProperty(value);
    }
    get openOnly() {
        return this._openOnly;
    }

    private _positionedParent?: HTMLElement;
    private _disabled = false;
    private _openOnly = false;

    private _alignPopupOnLeft = false;
    private _popupOnTop = false;
    private _popupOnRight = false;
    private _sameWidth = false;
    private _popupVerticalOffset = POPUP_OFFSET;

    constructor(private element: ElementRef, private service: PopupService, private renderer: Renderer2) {}

    ngOnInit() {
        this.element.nativeElement.setAttribute('aria-haspopup', true);

        this.paPopup?.onClose.subscribe(() => this.removeActiveStateFromParentButton());
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            coerceBooleanProperty(changes['popupOnRight']?.currentValue) &&
            coerceBooleanProperty(changes['alignPopupOnLeft']?.currentValue)
        ) {
            console.warn(
                `Incompatible parameters: alignPopupOnLeft and popupOnRight cannot be used at the same time. alignPopupOnLeft is taking precedence.`,
            );
        }
    }

    @HostListener('click', ['$event'])
    onClick($event: MouseEvent) {
        if (!this.popupDisabled) {
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

    /**
     * By definition, the root parent is the first DOM element in the tree with a defined position (which is not position: static)
     * or the Body.
     * In some case – like in multi-level dropdowns – the root parent is the direct container of the popup directive
     * and has the exact same left and right attributes. Such case makes getPosition returning a wrong position, and we prevent this
     * by returning the next positioned parent instead.
     * @param directiveElement
     * @private
     */
    private getRootParent(directiveElement: HTMLElement): HTMLElement {
        const rootParent = getPositionedParent(directiveElement.parentElement || directiveElement);
        const rootRect = rootParent.getBoundingClientRect();
        const directiveRect = directiveElement.getBoundingClientRect();
        if (rootRect.left === directiveRect.left && rootRect.right === directiveRect.right) {
            return this.getRootParent(rootParent.parentElement || rootParent);
        }
        return rootParent;
    }

    getPosition(): PositionStyle {
        const directiveElement: HTMLElement = this.element.nativeElement;
        const directiveRect = directiveElement.getBoundingClientRect();

        if (!this._positionedParent) {
            this._positionedParent = this.getRootParent(directiveElement.parentElement || directiveElement);
        }
        const rootRect = this._positionedParent.getBoundingClientRect();
        const top = directiveRect.bottom - rootRect.top + this._positionedParent.scrollTop;
        const bottom = window.innerHeight - directiveRect.top - window.scrollY;

        const position: PositionStyle = {
            position: 'absolute',
            top: !this.popupOnTop ? top + this.popupVerticalOffset + 'px' : undefined,
            bottom: this.popupOnTop ? bottom + this.popupVerticalOffset + 'px' : undefined,
            width: this._sameWidth ? directiveRect.right - directiveRect.left + 'px' : undefined,
        };

        if (this.alignPopupOnLeft) {
            position.left = `${Math.min(directiveRect.left - rootRect.left, window.innerWidth - 240)}px`;
        } else if (this.popupOnRight) {
            position.left = `${Math.min(directiveRect.right, window.innerWidth - 240)}px`;
        } else {
            position.right = `${Math.min(rootRect.right - directiveRect.right, window.innerWidth - 240)}px`;
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
