import {
  booleanAttribute,
  Directive,
  ElementRef,
  HostListener,
  Input,
  numberAttribute,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { getFixedRootParentIfAny, PositionStyle } from '../common';
import { POPUP_OFFSET, PopupComponent } from './popup.component';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[paPopup]',
  exportAs: 'paPopupRef',
})
export class PopupDirective implements OnInit, OnChanges, OnDestroy {
  @Input()
  set paPopup(popup: PopupComponent | undefined | null) {
    if (popup) {
      popup.popupHolder = this.element.nativeElement;
    }
    this._paPopup = popup;
  }
  get paPopup() {
    return this._paPopup;
  }
  @Input() popupPosition?: PositionStyle;
  @Input({ transform: numberAttribute }) popupVerticalOffset = POPUP_OFFSET;
  @Input({ transform: booleanAttribute }) alignPopupOnLeft = false;
  @Input({ transform: booleanAttribute }) popupOnTop = false;
  @Input({ transform: booleanAttribute }) popupOnRight = false;
  @Input({ transform: booleanAttribute }) sameWidth = false;
  @Input({ transform: booleanAttribute }) popupDisabled = false;
  @Input({ transform: booleanAttribute }) openOnly = false;

  private _paPopup?: PopupComponent | null;
  private _handlers: (() => void)[] = [];
  private _scrollOrResize = new Subject<Event>();
  private _terminator = new Subject<void>();
  private _hasFixedRootParent?: boolean;
  private _fixedRootParent?: HTMLElement;
  private _fixedRootParentChecked = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.element.nativeElement.setAttribute('aria-haspopup', true);

    this.paPopup?.onClose.pipe(takeUntil(this._terminator)).subscribe(() => {
      this.removeActiveStateFromParentButton();
      this.unListen();
    });

    this._scrollOrResize
      .pipe(throttleTime(10), takeUntil(this._terminator))
      .subscribe(() => this.paPopup?.updatePosition(this.getPosition()));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.popupOnRight && this.alignPopupOnLeft) {
      console.warn(
        `Incompatible parameters: alignPopupOnLeft and popupOnRight cannot be used at the same time. alignPopupOnLeft is taking precedence.`,
      );
    }

    if (changes['sameWidth'] && this.paPopup) {
      this.paPopup.sameWidth = changes['sameWidth'].currentValue;
    }
  }

  ngOnDestroy() {
    this.unListen();
    this._terminator.next();
    this._terminator.complete();
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
        this._handlers.push(this.renderer.listen('document', 'scroll', (event) => this._scrollOrResize.next(event)));
        this._handlers.push(this.renderer.listen('window', 'resize', (event) => this._scrollOrResize.next(event)));
        this.addActiveStateOnParentButton();
      }
    }
  }

  getPosition(): PositionStyle {
    const directiveElement: HTMLElement = this.element.nativeElement;
    const directiveRect = directiveElement.getBoundingClientRect();

    let top: number;
    let bottom: number;
    let containerRect: DOMRect | undefined;

    const parentElement: HTMLElement | null = directiveElement.parentElement;
    if (this._hasFixedRootParent === undefined && !this._fixedRootParentChecked) {
      this._fixedRootParent = parentElement ? getFixedRootParentIfAny(parentElement) : undefined;
      this._hasFixedRootParent = !!this._fixedRootParent;
      this._fixedRootParentChecked = true;
    }
    if (this._hasFixedRootParent && !!this._fixedRootParent) {
      // when a parent has `container-type: size` or `container-type: inline-size`,
      // the `position: fixed` are relative to the container and not to the window anymore
      containerRect = this._fixedRootParent.getBoundingClientRect();

      const scrollTop = this._fixedRootParent.scrollTop;
      top = directiveRect.top - containerRect.top + scrollTop + directiveRect.height + this.popupVerticalOffset;
      // popup on top cannot be computed with container-size because it would require the popup height which is not set at this moment
      // in this case we keep the popup below the directive
      bottom = this.popupVerticalOffset * -1;
    } else {
      top = directiveRect.top + directiveRect.height + this.popupVerticalOffset;
      bottom = window.innerHeight - directiveRect.top - window.scrollY + this.popupVerticalOffset;
    }

    const position: PositionStyle = {
      position: 'fixed',
      top: !this.popupOnTop ? `${top}px` : undefined,
      bottom: this.popupOnTop ? `${bottom}px` : undefined,
      width: this.sameWidth ? directiveRect.right - directiveRect.left + 'px' : undefined,
    };

    const bodyRect = document.body.getBoundingClientRect();
    if (this.alignPopupOnLeft) {
      position.left = !!containerRect ? `${directiveRect.left - containerRect.left}px` : `${directiveRect.left}px`;
    } else if (this.popupOnRight) {
      position.left = !!containerRect
        ? `${directiveRect.left - containerRect.left + directiveRect.width}px`
        : `${directiveRect.right}px`;
    } else {
      position.right = !!containerRect
        ? `${containerRect.right - directiveRect.right}px`
        : `${bodyRect.right - directiveRect.right}px`;
    }

    return position;
  }

  private unListen() {
    this._handlers.forEach((fn) => fn());
    this._handlers = [];
  }

  private addActiveStateOnParentButton() {
    if (this.element.nativeElement.tagName.toLowerCase() === 'pa-button') {
      this.renderer.addClass(this.element.nativeElement.children[0], 'pa-active');
    }
  }

  private removeActiveStateFromParentButton() {
    if (this.element.nativeElement.tagName.toLowerCase() === 'pa-button' && !this.elementIsSetToActive()) {
      this.renderer.removeClass(this.element.nativeElement.children[0], 'pa-active');
    }
  }

  /**
   * Check if element (like pa-button) was set to active programmatically.
   * @private
   */
  private elementIsSetToActive() {
    const ngActive = this.element.nativeElement.getAttribute('ng-reflect-active');
    return ngActive === 'true' || ngActive === '';
  }
}
