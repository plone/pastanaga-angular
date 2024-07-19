import {
  booleanAttribute,
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
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

let nextId = 0;
export const POPUP_OFFSET = 4;

@Component({
  selector: 'pa-popup',
  templateUrl: './popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  @Input() companionElement?: any;
  @Input({ transform: booleanAttribute }) adjustHeight = false;
  @Input({ transform: booleanAttribute }) dontAdjustPosition = false;
  @Input({ transform: booleanAttribute }) keepOthersOpen = false;
  @Input({ transform: booleanAttribute }) stayVisible = false;
  // sameWidth is used in dropdowns to prevent adding a max-width when it's not needed
  @Input({ transform: booleanAttribute }) sameWidth = false;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onOpen: EventEmitter<void> = new EventEmitter();

  popupType: 'popup' | 'dropdown' | 'menu' = 'popup';
  isDisplayed = false;
  style?: any;
  popupHolder?: HTMLElement;

  private _id = '';
  private _handlers: (() => void)[] = [];
  private _originalHeight = 0;
  protected _terminator = new Subject<void>();

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
    this._id = !this.id ? `${this.popupType}-${nextId++}` : `${this.id}-${this.popupType}`;
    this.isDisplayed = this.stayVisible;
  }

  ngOnDestroy() {
    this.unListen();
    this._terminator.next();
    this._terminator.complete();
  }

  show(style: PositionStyle) {
    if (!this.keepOthersOpen && this._id) {
      this.popupService.closeAllButId.next(this._id);
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

  updatePosition(style: PositionStyle) {
    this.style = style;
    markForCheck(this.cdr);
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
    if (!this.dontAdjustPosition) {
      isAdjusted = this._adjustPosition(element, rect, diffX, diffY);
    } else if (this.adjustHeight && diffY > 0) {
      element.style.maxHeight = `${this._originalHeight - diffY - POPUP_OFFSET}px`;
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
      const holderHeight = this.popupHolder?.clientHeight || 0;
      if (currentTop.endsWith('px') && parseInt(currentTop.slice(0, -2), 10) > (this._originalHeight + holderHeight)) {
        // enough space above, we display the dropdown on top
        element.style.top = `calc(${currentTop} - ${this._originalHeight}px - ${holderHeight}px - ${POPUP_OFFSET * 2}px)`;
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
