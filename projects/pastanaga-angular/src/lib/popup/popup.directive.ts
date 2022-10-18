import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { getPositionedParent, PositionStyle } from '../common';
import { POPUP_OFFSET, PopupComponent } from './popup.component';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { PopupService } from './popup.service';

@Directive({
    selector: '[paPopup]',
    exportAs: 'paPopupRef',
})
export class PopupDirective implements OnInit {
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

    private _rootParent?: HTMLElement;
    private _disabled = false;
    private _openOnly = false;

    private _alignPopupOnLeft = false;
    private _popupOnTop = false;
    private _sameWidth = false;
    private _popupVerticalOffset = POPUP_OFFSET;

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
        const bottom = window.innerHeight - rect.top - window.scrollY;

        const position: PositionStyle = {
            position: 'absolute',
            top: !this.popupOnTop ? top + this.popupVerticalOffset + 'px' : undefined,
            bottom: this.popupOnTop ? bottom + this.popupVerticalOffset + 'px' : undefined,
            width: this._sameWidth ? rect.right - rect.left + 'px' : undefined,
        };

        if (this._alignPopupOnLeft) {
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
