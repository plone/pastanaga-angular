import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { getPositionedParent, PositionStyle } from '../common';
import { PopupComponent } from './popup.component';
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
    get popupOnRight(): boolean { return this._popupOnRight; }
    set popupOnRight(value: boolean) { this._popupOnRight = coerceBooleanProperty(value); }
    @Input()
    get popupDisabled(): boolean { return this._disabled; }
    set popupDisabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }

    _rootParent?: HTMLElement;
    _remoteElement?: HTMLElement;
    _disabled = false;

    _popupOnRight = false;

    constructor(
        private element: ElementRef,
        private service: PopupService,
    ) {}

    ngOnInit() {
        this.element.nativeElement.setAttribute('aria-haspopup', true);
    }

    @HostListener('click', ['$event'])
    onClick($event: MouseEvent, override?: PositionStyle, isContextual?: boolean, useLast?: boolean) {
        if (!this._disabled) {
            const menu = this.paPopup;
            if (!!menu) {
                if (menu._isDisplayed) {
                    menu.close();
                } else {
                    let position: PositionStyle;
                    if (!useLast || !this.service.lastPosition) {
                        position = !isContextual && !!this.popupPosition ? this.popupPosition :
                            this.getPosition(override, isContextual && $event);
                        this.service.lastPosition = position;
                    } else {
                        position = this.service.lastPosition;
                    }
                    menu.show(position);
                }
            }
        }
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    getPosition(override?: PositionStyle, contextualEvent?: MouseEvent | false): PositionStyle {
        const directiveElement: HTMLElement = this.element.nativeElement;
        const clickedElement: HTMLElement = this._remoteElement || directiveElement;
        const rect = contextualEvent ? {
            top: contextualEvent.y,
            bottom: contextualEvent.y,
            left: contextualEvent.x,
            right: contextualEvent.x,
        } : clickedElement.getBoundingClientRect();
        if (!this._rootParent) {
            this._rootParent = getPositionedParent(directiveElement.parentElement || directiveElement);
        }
        const rootRect = this._rootParent.getBoundingClientRect();
        const top =  rect.top - rootRect.top + this._rootParent.scrollTop;

        let position: PositionStyle = {
            position: 'absolute',
            top: top + 'px',
        };
        if (this._popupOnRight || !!contextualEvent) {
            position.left = Math.min(rect.left - rootRect.left, window.innerWidth - 240) + 'px';
        } else {
            position.right = Math.min(rootRect.right - rect.right + 3, window.innerWidth - 240) + 'px';
        }
        if (!!override) {
            position = Object.assign(position, override);
        }

        return position;
    }
}
