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
import { detectChanges, getVirtualScrollParentPosition, markForCheck, PositionStyle } from '../common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

let nextId = 0;
export const MARGIN = 4;

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
    set stayVisible(value: any) {
        this._stayVisible = coerceBooleanProperty(value);
    }
    @Input()
    get dontAdjustPosition(): boolean {
        return this._dontAdjustPosition;
    }
    set dontAdjustPosition(value: any) {
        this._dontAdjustPosition = coerceBooleanProperty(value);
    }

    @Input()
    get adjustHeight(): boolean {
        return this._adjustHeight;
    }
    set adjustHeight(value: any) {
        this._adjustHeight = coerceBooleanProperty(value);
    }

    @Input()
    set keepOthersOpen(value: any) {
        this._keepOthersOpen = coerceBooleanProperty(value);
    }
    get keepOthersOpen() {
        return this._keepOthersOpen;
    }

    @Output() onClose: EventEmitter<boolean> = new EventEmitter();
    @Output() onOpen: EventEmitter<void> = new EventEmitter();

    set popupType(value: 'popup' | 'dropdown' | 'menu') {
        this._popupType = value;
    }
    get popupType() {
        return this._popupType;
    }

    isDisplayed = false;
    style?: any;

    private _id = '';
    private _handlers: (() => void)[] = [];
    private _dontAdjustPosition = false;

    private _keepOthersOpen = false;
    private _stayVisible = false;
    private _adjustHeight = false;
    private _popupType: 'popup' | 'dropdown' | 'menu' = 'popup';
    private _originalHeight = 0;
    private _terminator = new Subject<void>();

    constructor(
        protected popupService: PopupService,
        protected renderer: Renderer2,
        protected element: ElementRef,
        protected cdr: ChangeDetectorRef,
    ) {
        this.popupService.closeAllPopups
            .pipe(
                filter(() => this.popupType === 'popup' || this.popupType === 'menu'),
                takeUntil(this._terminator),
            )
            .subscribe(() => this.close());

        this.popupService.closeAllButId
            .pipe(
                filter((id) => id !== this._id),
                takeUntil(this._terminator),
            )
            .subscribe(() => this.close());
    }

    ngOnInit() {
        this._id = !this.id ? `${this._popupType}-${nextId++}` : `${this.id}-${this._popupType}`;
        this.isDisplayed = this.stayVisible;
    }

    ngOnDestroy() {
        this.unListen();
        this._terminator.next();
        this._terminator.complete();
    }

    show(style: PositionStyle) {
        if (!this.keepOthersOpen && this.id) {
            this.popupService.closeAllButId.next(this.id);
        }
        this.style = style;
        this.isDisplayed = true;
        this.onOpen.emit();
        if (!this.stayVisible) {
            this._handlers.push(this.renderer.listen('document', 'click', (event) => this.onOutsideClick(event)));
            this._handlers.push(this.renderer.listen('document', 'keyup.esc', () => this.close()));
        }

        markForCheck(this.cdr);
        this.adjustPosition();
    }

    private adjustPosition() {
        window.setTimeout(() => {
            if ((!this.dontAdjustPosition || this.adjustHeight) && !this.adjust()) {
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
            isAdjusted = this._adjustPosition(element, rect, diffX, diffY);
        } else if (this._adjustHeight && diffY > 0) {
            element.style.maxHeight = `${this._originalHeight - diffY - MARGIN}px`;
            isAdjusted = true;
        }
        if (isAdjusted) {
            markForCheck(this.cdr);
        }
        return true;
    }

    private _adjustPosition(element: HTMLElement, rect: DOMRect, diffX: number, diffY: number): boolean {
        if (diffX > 0) {
            element.style.left = `calc(${element.style.left} - ${diffX}px)`;
            return true;
        } else if (rect.left < 0) {
            element.style.left = `0px`;
            return true;
        }
        if (diffY > 0) {
            const currentTop = element.style.top || '';
            if (currentTop.endsWith('px') && parseInt(currentTop.slice(0, -2), 10) > this._originalHeight) {
                // enough space above, we display the dropdown on top
                element.style.top = `calc(${currentTop} - ${this._originalHeight}px - ${MARGIN * 2}px)`;
                return true;
            } else if (!!currentTop) {
                // not enough space, we just align the dropdown bottom with the parent bottom
                element.style.top = `calc(${currentTop} - ${diffY}px)`;
                return true;
            }
        }
        return false;
    }

    close(byClickingOutside?: boolean) {
        if (!this.stayVisible && this.isDisplayed) {
            this.isDisplayed = false;
            this.unListen();
            this.onClose.emit(byClickingOutside);
            // detectChanges instead of markForCheck because this method can be called from an observable
            detectChanges(this.cdr);
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
