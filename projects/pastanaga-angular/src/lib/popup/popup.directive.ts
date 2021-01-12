import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { getPositionedParent, PositionStyle } from '../common';
import { MARGIN, PopupComponent } from './popup.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from './popup.service';

@Directive({
    selector: '[paPopup]',
    exportAs: 'paPopupRef',
})
export class PopupDirective implements OnInit {
    @Input() paPopup?: PopupComponent;
    @Input() popupPosition?: PositionStyle;
    @Input()
    set openOnHover(value: boolean) {
        this._openOnHover = coerceBooleanProperty(value);
    }
    get openOnHover(): boolean {
        return this._openOnHover;
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

    private _rootParent?: HTMLElement;
    private _remoteElement?: HTMLElement;
    private _disabled = false;

    private _popupOnRight = false;
    private _popupOnTop = false;
    private _sameWidth = false;
    private _openOnHover = false;

    constructor(private element: ElementRef, private service: PopupService) {}

    ngOnInit() {
        this.element.nativeElement.setAttribute('aria-haspopup', true);
    }

    @HostListener('click', ['$event'])
    onClick($event: MouseEvent) {
        if (!this._disabled) {
            if (!!this.paPopup) {
                if (this.paPopup._isDisplayed) {
                    this.paPopup.close();
                } else {
                    const position: PositionStyle = !!this.popupPosition ? this.popupPosition : this.getPosition();
                    this.paPopup.show(position);
                }
            }
        }
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    @HostListener('mouseenter')
    onHover() {
        if (this._openOnHover && !this._disabled && !this.paPopup?._isDisplayed) {
            this.paPopup?.show(this.getPosition());
        }
    }
    @HostListener('mouseleave')
    onLeave() {
        if (this._openOnHover && !this._disabled && !!this.paPopup?._isDisplayed) {
            this.paPopup.close();
        }
    }

    getPosition(): PositionStyle {
        const directiveElement: HTMLElement = this.element.nativeElement;
        const clickedElement: HTMLElement = this._remoteElement || directiveElement;
        const rect = clickedElement.getBoundingClientRect();

        if (!this._rootParent) {
            this._rootParent = getPositionedParent(directiveElement.parentElement || directiveElement);
        }
        const rootRect = this._rootParent.getBoundingClientRect();
        const top = rect.bottom - rootRect.top + this._rootParent.scrollTop;
        const bottom = window.innerHeight - rect.top - window.pageYOffset;

        const position: PositionStyle = {
            position: 'absolute',
            top: !this.popupOnTop ? top + MARGIN + 'px' : undefined,
            bottom: this.popupOnTop ? bottom - MARGIN + 'px' : undefined,
            width: this._sameWidth ? rect.right - rect.left + 'px' : undefined,
        };

        if (this._popupOnRight) {
            position.left = Math.min(rect.left - rootRect.left, window.innerWidth - 240) + 'px';
        } else {
            position.right = Math.min(rootRect.right - rect.right + 3, window.innerWidth - 240) + 'px';
        }

        return position;
    }
}
