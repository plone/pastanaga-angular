import { Directive, ElementRef, Host, HostListener, Inject, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { WINDOW } from '@ng-web-apis/common';
import { PopoverComponent } from './popover.component';
import { PopupDirective } from '../popup.directive';
import { BreakpointObserver, ViewportMode } from '../../breakpoint-observer';
import { PositionStyle } from '../../common';

@Directive({
  selector: '[paPopover]',
  standalone: false,
})
export class ExtendedPopupDirective extends PopupDirective {}

@Directive({
  selector: '[paPopover]',
  exportAs: 'paPopoverRef',
  standalone: false,
})
export class PopoverDirective implements OnDestroy {
  @Input()
  set paPopover(popover: PopoverComponent | undefined) {
    if (popover) {
      popover.popoverHolder = this.element.nativeElement;
    }
    this.popupDirective.paPopup = popover;
  }

  @Input()
  set paPopoverOffset(value: string) {
    if (value) {
      this._offset = value;
    }
  }
  get offset() {
    return this._offset;
  }

  private _offset = '8px';
  private _terminator = new Subject<void>();

  isVisibleOnHover: Observable<boolean> = this.breakpoint.currentMode.pipe(
    map((mode) => mode === 'desktop'),
    takeUntil(this._terminator),
  );
  mode?: ViewportMode;

  constructor(
    @Host() public popupDirective: ExtendedPopupDirective,
    private element: ElementRef,
    private breakpoint: BreakpointObserver,
    @Inject(WINDOW) private window: any, // we need `any` so the non-Ivy compilation do not break when building the lib bundle
  ) {
    breakpoint.currentMode.pipe(takeUntil(this._terminator)).subscribe((mode) => (this.mode = mode));
  }

  ngOnDestroy() {
    this._terminator.next();
    this._terminator.complete();
  }

  toggle() {
    if (!this.popupDirective.popupDisabled) {
      if (!this.popupDirective.paPopup?.isDisplayed) {
        this.popupDirective.paPopup?.show(this.getPosition());
      } else {
        this.popupDirective.paPopup.close();
      }
    }
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.popupDirective.popupPosition = this.getPosition();
  }

  @HostListener('mouseenter')
  onHover() {
    this.isVisibleOnHover
      .pipe(
        filter((onHoverEnabled) => onHoverEnabled),
        take(1),
        takeUntil(this._terminator),
      )
      .subscribe(() => {
        if (!this.popupDirective.popupDisabled && !this.popupDirective.paPopup?.isDisplayed) {
          this.popupDirective.paPopup?.show(this.getPosition());
        }
      });
  }

  @HostListener('mouseleave')
  onLeave() {
    this.isVisibleOnHover
      .pipe(
        filter((onHoverEnabled) => onHoverEnabled),
        take(1),
        takeUntil(this._terminator),
      )
      .subscribe(() => {
        if (!this.popupDirective.popupDisabled && !!this.popupDirective.paPopup?.isDisplayed) {
          this.popupDirective.paPopup.close();
        }
      });
  }

  private getPosition(): PositionStyle {
    const rectOrigin = this.element.nativeElement.getBoundingClientRect();
    const top = rectOrigin.bottom;
    const translateX = `calc(-50% + ${rectOrigin.width}px/2)`;
    const translateY = this._offset;
    return {
      position: 'fixed',
      top: `${top}px`,
      left: `${rectOrigin.left}px`,
      transform: `translateX(${translateX}) translateY(${translateY})`,
    };
  }
}
