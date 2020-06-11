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
    Renderer2
} from '@angular/core';
import { PopupService } from './popup.service';
import { getVirtualScrollParentPosition, markForCheck, PositionStyle } from '../common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;

@Component({
    selector: 'pa-popup',
    templateUrl: './popup.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    @Input() companionElement?: any;
    @Input()
    get isAlwaysOn(): boolean { return this._isAlwaysOn; }
    set isAlwaysOn(value: boolean) { this._isAlwaysOn = coerceBooleanProperty(value); }

    @Output() onClose: EventEmitter<boolean> = new EventEmitter();

    _id = '';
    _isAlwaysOn = false;
    _isDisplayed = false;
    _style?: any;
    _handlers: Function[] = [];

    constructor(
        public service: PopupService,
        public renderer: Renderer2,
        public element: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        this.service.closeAllPopups.subscribe(() => this.close());
        this.service.closeAllButId.subscribe((id) => {
            if (id !== this._id) {
                this.close();
            }
        });
    }

    ngOnInit() {
        this._id = !this.id ? `popup-${nextId++}` : `${this.id}-popup`;
        this._isDisplayed = this._isAlwaysOn;
    }

    ngOnDestroy() {
        this.unListen();
    }

    show(style: PositionStyle, hasSubLevel = false) {
        if (!hasSubLevel) {
            this.service.closeAllButId.next(this.id);
        }
        this._style = style;
        this._isDisplayed = true;
        if (!this._isAlwaysOn) {
            this._handlers.push(this.renderer.listen('document', 'click', (event) => this.onOutsideClick(event)));
            this._handlers.push(this.renderer.listen('document', 'keyup.esc', () => this.close()));
        }

        markForCheck(this.cdr);
        window.setTimeout(() => {
            if (!this.adjustPosition()) {
                const interval = window.setInterval(() => {
                    if (this.adjustPosition()) {
                        window.clearInterval(interval);
                    }
                }, 200);
            }
        }, 0);
    }

    adjustPosition(): boolean {
        if (!this.element.nativeElement) {
            return false;
        }
        let isAdjusted = false;
        const element: HTMLElement = this.element.nativeElement.firstElementChild;
        const rect = element.getBoundingClientRect();
        if (rect.height <= 12) {
            // menu is still empty
            return false;
        }
        const {bottom, right} = getVirtualScrollParentPosition(element) || {bottom: window.innerHeight, right: window.innerWidth};
        const diffX = rect.left + rect.width - right;
        if (diffX > 0) {
            element.style.left = `calc(${element.style.left} - ${diffX}px)`;
            isAdjusted = true;
        } else if (rect.left < 0) {
            element.style.left = `0px`;
            isAdjusted = true;
        }
        const diffY = rect.top + rect.height - bottom;
        if (diffY > 0) {
            const currentTop = element.style.top || '';
            if (currentTop.endsWith('px') && parseInt(currentTop.slice(0, -2), 10) > rect.height) {
                // enough space above, we display the dropdown on top
                element.style.top = `calc(${currentTop} - ${rect.height}px)`;
                isAdjusted = true;
            } else if (!!currentTop) {
                // not enough space, we just align the dropdown bottom with the parent bottom
                element.style.top = `calc(${currentTop} - ${diffY}px)`;
                isAdjusted = true;
            }
        }
        if (isAdjusted) {
            markForCheck(this.cdr);
        }
        return true;
    }

    close(byClickingOutside?: boolean) {
        if (!this._isAlwaysOn && this._isDisplayed) {
            this._isDisplayed = false;
            this.unListen();
            this.onClose.emit(byClickingOutside);
            markForCheck(this.cdr);
        }
    }

    onOutsideClick(event: MouseEvent) {
        if (!this.element.nativeElement.contains(event.target)
            && (!this.companionElement || !this.companionElement.contains(event.target))) {
            this.service.closeAllSubMenu.next();
            this.close(true);
        }
    }

    unListen() {
        this._handlers.forEach(fn => fn());
        this._handlers = [];
    }
}
