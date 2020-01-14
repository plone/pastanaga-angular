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
import { getVirtualScrollParentPosition, markForCheck, PositionStyle } from '../common/utils';

let nextId = 0;

@Component({
    selector: 'pa-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./_popup.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    @Input() isAlwaysOn = false;
    @Input() parentElement?: any;

    @Output() onClose: EventEmitter<void> = new EventEmitter();

    isDisplayed = false;
    style?: any;
    handlers: Function[] = [];


    constructor(
        public service: PopupService,
        public renderer: Renderer2,
        public element: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        this.service.closeAllPopups.subscribe(() => this.close());
        this.service.closeAllButId.subscribe((id) => {
            if (id !== this.id) {
                this.close();
            }
        });
    }

    ngOnInit() {
        this.id = !this.id ? `dropdown-${nextId++}` : `${this.id}-dropdown`;
        this.isDisplayed = this.isAlwaysOn;
    }

    ngOnDestroy() {
        this.unlisten();
    }

    show(style: PositionStyle, hasSubLevel = false) {
        if (!hasSubLevel) {
            this.service.closeAllButId.next(this.id);
        }
        this.style = style;
        this.isDisplayed = true;
        if (!this.isAlwaysOn) {
            this.handlers.push(this.renderer.listen('document', 'click', (event) => this.onOutsideClick(event)));
            this.handlers.push(this.renderer.listen('document', 'keyup.esc', () => this.close()));
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
        if (!!this.element.nativeElement) {
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
        } else {
            return false;
        }
    }

    close() {
        if (!this.isAlwaysOn && this.isDisplayed) {
            this.isDisplayed = false;
            this.unlisten();
            this.onClose.emit();
            markForCheck(this.cdr);
        }
    }

    onOutsideClick(event) {
        if (!this.element.nativeElement.contains(event.target)
            && (!this.parentElement || !this.parentElement.contains(event.target))) {
            this.service.closeAllSubMenu.next();
            this.close();
        }
    }

    unlisten() {
        this.handlers.forEach(fn => fn());
        this.handlers = [];
    }
}
