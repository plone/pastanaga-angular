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
})
export class ExtendedPopupDirective extends PopupDirective {}

@Directive({
    selector: '[paPopover]',
})
export class PopoverDirective implements OnDestroy {
    @Input() set paPopover(popover: PopoverComponent | undefined) {
        if (popover) {
            this.hasFlexParent =
                this.window.getComputedStyle(this.element.nativeElement.parentElement).display === 'flex';
            popover.popoverHolder = this.element.nativeElement;
            popover.hasFlexParent = this.hasFlexParent;
        }
        this.popupDirective.paPopup = popover;
    }

    private _terminator = new Subject<void>();

    hasFlexParent = false;
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
        const top = this.hasFlexParent ? rectOrigin.top : rectOrigin.bottom;
        const translateX = this.hasFlexParent
            ? `calc(-50% - ${rectOrigin.width}px/2)`
            : `calc(-50% + ${rectOrigin.width}px/2)`;
        const translateY = this.hasFlexParent && this.mode === 'tablet' ? `calc(-50% + 16px)` : '8px';
        return {
            position: 'fixed',
            top: `${top}px`,
            transform: `translateX(${translateX}) translateY(${translateY})`,
        };
    }
}
