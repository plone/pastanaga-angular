import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { getPositionnedParent, getRealPosition, PositionStyle } from '../common/utils';
import { PopupComponent } from './popup.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from './popup.service';

interface RemoteClickParams {
    event: MouseEvent;
    override?: PositionStyle;
    isContextual?: boolean;
    ignoreRemote?: boolean;
    useLastPosition?: boolean;
    useRealComputedPosition?: boolean;
}

@Directive({
    selector: '[paPopup]',
    exportAs: 'paPopupRef',
})
export class PopupDirective implements OnInit {
    @Input() paPopup?: PopupComponent;
    @Input() set popupOnRight(value) { this._popupOnRight = coerceBooleanProperty(value); }
    _popupOnRight = false;
    @Input() popupPosition?: PositionStyle;
    @Input() set openedFromPopup(value) { this._openedFromPopup = coerceBooleanProperty(value); }
    rootParent?: HTMLElement;
    remoteElement?: HTMLElement;

    _openedFromPopup = false;

    constructor(
        private element: ElementRef,
        private service: PopupService,
    ) {}

    ngOnInit() {
        this.element.nativeElement.setAttribute('aria-haspopup', true);
    }

    @HostListener('click', ['$event'])
    onClick($event: MouseEvent, override?: PositionStyle, isContextual?: boolean, useLast?: boolean) {
        const menu = this.paPopup;
        if (!!menu) {
            if (menu.isDisplayed && !this._openedFromPopup) {
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
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    /*
    Allow to trigger the dropdown open/close by clicking on another element than the one having the directive
    - event: the MouseEvent on the remote element
    - override: allow to force the CSS position, top, left, right, bottom properties
    - isContextual: true if we want the menu to be displayed at mouse position, false to display it aligned with the button
    - ignoreRemote: true if we want to position the menu only relatively to the button, not the clicked element
    - useLastPosition: true if we want to display the dropdown at the same position as the previous one
      (useful for dropdown menu triggering another dropdown).
      Note: it might not work if the first dropdown
    - useRealComputedPosition: [NOT RECOMMENDED] true if we want to compute the real position by iterating on the clicked element ancestors
      Its main purpose is to fight the margin defined by the Angular Material side menu. Prefer another option.
    */
    remoteClick(params: RemoteClickParams) {
        if (!params.ignoreRemote && !params.useLastPosition) {
            this.remoteElement = params.event.currentTarget as HTMLElement;
        }
        if (!params.useLastPosition && params.useRealComputedPosition && !!params.event.currentTarget) {
            const position = getRealPosition(params.event.currentTarget as HTMLElement, false);
            params.override = {top: `${position.top}px`, left: `${position.left}px`};
        }
        this.onClick(params.event, params.override, params.isContextual, params.useLastPosition);
    }

    getPosition(override?: PositionStyle, contextualEvent?: MouseEvent | false): PositionStyle {
        const directiveElement: HTMLElement = this.element.nativeElement;
        const clickedElement: HTMLElement = this.remoteElement || directiveElement;
        const rect = contextualEvent ? {
            top: contextualEvent.y,
            bottom: contextualEvent.y,
            left: contextualEvent.x,
            right: contextualEvent.x,
        } : clickedElement.getBoundingClientRect();
        if (!this.rootParent) {
            this.rootParent = getPositionnedParent(directiveElement.parentElement || directiveElement);
        }
        const rootRect = this.rootParent.getBoundingClientRect();
        const top =  rect.top - rootRect.top + this.rootParent.scrollTop;

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
