import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { PopupComponent } from '../popup.component';
import { PopupService } from '../popup.service';
import { markForCheck } from '../../common';

export const spacer = 8;

@Component({
  selector: 'pa-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent extends PopupComponent implements OnInit {
  popoverHolder?: HTMLElement;

  constructor(
    public override popupService: PopupService,
    public override renderer: Renderer2,
    public override element: ElementRef,
    public override cdr: ChangeDetectorRef,
    @Inject(WINDOW) private window: any, // we need `any` so the non-Ivy compilation do not break when building the lib bundle
  ) {
    super(popupService, renderer, element, cdr);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override adjust() {
    const popover = this.getPopoverElement();
    const popoverRect = popover.getBoundingClientRect();
    const holderRect: DOMRect =
      this.popoverHolder?.getBoundingClientRect() ||
      ({
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: 0,
        width: 0,
      } as DOMRect);

    this.renderer.removeClass(popover, 'arrow-left');
    this.renderer.removeClass(popover, 'arrow-right');
    this.renderer.removeClass(popover, 'arrow-top');

    const rightDiff = this.window.innerWidth - popoverRect.right;
    if (this.window.innerHeight < popoverRect.bottom) {
      if (rightDiff < popoverRect.width && popoverRect.left >= 0) {
        this.moveToLeft(popover, holderRect);
      } else {
        this.moveToRight(popover, holderRect);
      }
    } else if (rightDiff < 0) {
      this.moveToLeft(popover, holderRect);
    } else if (popoverRect.left < 0) {
      this.moveToRight(popover, holderRect);
    } else {
      this.renderer.addClass(popover, 'arrow-top');
    }

    this.renderer.addClass(popover, 'pa-visible');
    markForCheck(this.cdr);
    return true;
  }

  override close(byClickingOutside?: boolean) {
    this.renderer.removeClass(this.getPopoverElement(), 'pa-visible');
    super.close(byClickingOutside);
  }

  private moveToLeft(popup: any, holderRect: DOMRect) {
    const translateX = `calc(-100% - ${spacer}px)`;
    const translateY = `calc(-50% - ${holderRect.height}px/2)`;
    this.style = {
      ...this.style,
      transform: `translateX(${translateX}) translateY(${translateY})`,
    };
    this.renderer.addClass(popup, 'arrow-right');
  }

  private moveToRight(popup: any, holderRect: DOMRect) {
    const translateX = `${holderRect.width + spacer}px`;
    const translateY = `calc(-50% - ${holderRect.height}px/2)`;
    this.style = {
      ...this.style,
      transform: `translateX(${translateX}) translateY(${translateY})`,
    };
    this.renderer.addClass(popup, 'arrow-left');
  }

  private getPopoverElement() {
    return this.element.nativeElement.firstElementChild;
  }
}
