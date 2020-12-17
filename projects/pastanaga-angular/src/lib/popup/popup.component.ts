import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
} from '@angular/core';
import { PopupService } from './popup.service';
import { getVirtualScrollParentPosition, markForCheck, PositionStyle } from '../common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;
export const MARGIN = 6;

@Component({
    selector: 'pa-popup',
    templateUrl: './popup.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    @Input() companionElement?: any;
    @Input()
    get stayVisible(): boolean {
        return this._stayVisible;
    }
    set stayVisible(value: boolean) {
        this._stayVisible = coerceBooleanProperty(value);
    }
    @Input()
    get dontAdjustPosition(): boolean {
        return this._dontAdjustPosition;
    }
    set dontAdjustPosition(value: boolean) {
        this._dontAdjustPosition = coerceBooleanProperty(value);
    }

    @Input()
    get adjustHeight(): boolean {
        return this._adjustHeight;
    }
    set adjustHeight(value: boolean) {
        this._adjustHeight = coerceBooleanProperty(value);
    }

    @Output() onClose: EventEmitter<boolean> = new EventEmitter();
    @Output() onOpen: EventEmitter<void> = new EventEmitter();

    _id = '';
    _stayVisible = false;
    _isDisplayed = false;
    _style?: any;
    _handlers: (() => void)[] = [];
    _dontAdjustPosition = false;
    private _adjustHeight = false;

    _popupType = 'popup';
    private _originalHeight = 0;

    constructor(
        public popupService: PopupService,
        public renderer: Renderer2,
        public element: ElementRef,
        public cdr: ChangeDetectorRef
    ) {
        this.popupService.closeAllPopups.subscribe(() => this.close());
        this.popupService.closeAllButId.subscribe((id) => {
            if (id !== this._id) {
                this.close();
            }
        });
    }

    ngOnInit() {
        this._id = !this.id ? `${this._popupType}-${nextId++}` : `${this.id}-${this._popupType}`;
        this._isDisplayed = this._stayVisible;
    }

    ngOnDestroy() {
        this.unListen();
    }

    show(style: PositionStyle, hasSubLevel = false) {
        if (!hasSubLevel) {
            this.popupService.closeAllButId.next(this.id);
        }
        this._style = style;
        this._isDisplayed = true;
        this.onOpen.emit();
        if (!this._stayVisible) {
            this._handlers.push(this.renderer.listen('document', 'click', (event) => this.onOutsideClick(event)));
            this._handlers.push(this.renderer.listen('document', 'keyup.esc', () => this.close()));
        }

        markForCheck(this.cdr);
        window.setTimeout(() => {
            if ((!this._dontAdjustPosition || this._adjustHeight) && !this.adjust()) {
                const interval = window.setInterval(() => {
                    if (this.adjust()) {
                        window.clearInterval(interval);
                    }
                }, 200);
            }
        }, 0);
    }

    adjust(): boolean {
        if (!this.element.nativeElement) {
            return false;
        }
        let isAdjusted = false;
        const element: HTMLElement = this.element.nativeElement.firstElementChild;
        const rect = element.getBoundingClientRect();
        if (rect.height <= 12) {
            // menu is still empty
            return false;
        } else {
            this._originalHeight = this._originalHeight || rect.height;
        }
        const { bottom, right } = getVirtualScrollParentPosition(element) || {
            bottom: window.innerHeight,
            right: window.innerWidth,
        };
        const diffX = rect.left + rect.width - right;
        const diffY = rect.top + this._originalHeight - bottom;
        if (!this._dontAdjustPosition) {
            if (diffX > 0) {
                element.style.left = `calc(${element.style.left} - ${diffX}px)`;
                isAdjusted = true;
            } else if (rect.left < 0) {
                element.style.left = `0px`;
                isAdjusted = true;
            }
            if (diffY > 0) {
                const currentTop = element.style.top || '';
                if (currentTop.endsWith('px') && parseInt(currentTop.slice(0, -2), 10) > this._originalHeight) {
                    // enough space above, we display the dropdown on top
                    element.style.top = `calc(${currentTop} - ${this._originalHeight}px - ${MARGIN * 2}px)`;
                    isAdjusted = true;
                } else if (!!currentTop) {
                    // not enough space, we just align the dropdown bottom with the parent bottom
                    element.style.top = `calc(${currentTop} - ${diffY}px)`;
                    isAdjusted = true;
                }
            }
        } else if (this._adjustHeight && diffY > 0) {
            element.style.maxHeight = `${this._originalHeight - diffY - MARGIN}px`;
            isAdjusted = true;
        }
        if (isAdjusted) {
            markForCheck(this.cdr);
        }
        return true;
    }

    close(byClickingOutside?: boolean) {
        if (!this._stayVisible && this._isDisplayed) {
            this._isDisplayed = false;
            this.unListen();
            this.onClose.emit(byClickingOutside);
            markForCheck(this.cdr);
        }
    }

    onOutsideClick(event: MouseEvent) {
        if (
            !this.element.nativeElement.contains(event.target) &&
            (!this.companionElement || !this.companionElement.contains(event.target))
        ) {
            this.popupService.closeAllSubMenu.next();
            this.close(true);
        }
    }

    unListen() {
        this._handlers.forEach((fn) => fn());
        this._handlers = [];
    }
}
