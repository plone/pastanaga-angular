import { ExtendedPopupDirective, PopoverDirective } from './popover.directive';
import { ElementRef } from '@angular/core';
import { BreakpointObserver, ViewportMode } from '../../breakpoint-observer';
import { BehaviorSubject } from 'rxjs';
import { PopoverComponent } from './popover.component';
import { waitForAsync } from '@angular/core/testing';
import { PopupComponent } from '../popup.component';

describe('PopoverDirective', () => {
    let directive: PopoverDirective;
    let popupDirective: ExtendedPopupDirective;
    let parentRef: ElementRef;
    const window: Window = {
        getComputedStyle: jest.fn((element) => element.style),
    } as any as Window;
    let popoverComponent: PopoverComponent;

    const createDirective: (parentElement: ElementRef, mode?: ViewportMode) => PopoverDirective = (
        parentElement: ElementRef,
        mode = 'desktop',
    ) => {
        const breakpoint = { currentMode: new BehaviorSubject(mode) } as any as BreakpointObserver;
        return new PopoverDirective(popupDirective, parentElement, breakpoint, window);
    };

    beforeEach(() => {
        popupDirective = {} as ExtendedPopupDirective;
        parentRef = {
            nativeElement: {
                getBoundingClientRect: jest.fn(),
                parentElement: { style: { display: 'block' } },
            },
        };
        popoverComponent = {} as PopoverComponent;
    });

    describe('paPopover setter', () => {
        it('should set directive holder element in the component', () => {
            directive = createDirective(parentRef);
            directive.paPopover = popoverComponent;
            expect(popoverComponent.popoverHolder).toBe(parentRef.nativeElement);
        });

        it('should set the component in paPopup property of the popup directive', () => {
            directive = createDirective(parentRef);
            directive.paPopover = popoverComponent;
            expect(directive.popupDirective.paPopup).toBe(popoverComponent);
        });
    });

    describe('isVisibleOnHover', () => {
        it('should be false on mobile', waitForAsync(() => {
            directive = createDirective(parentRef, 'mobile');
            directive.isVisibleOnHover.subscribe((hoverEnabled) => expect(hoverEnabled).toBe(false));
        }));

        it('should be false on tablet', waitForAsync(() => {
            directive = createDirective(parentRef, 'tablet');
            directive.isVisibleOnHover.subscribe((hoverEnabled) => expect(hoverEnabled).toBe(false));
        }));

        it('should be true on desktop', waitForAsync(() => {
            directive = createDirective(parentRef, 'desktop');
            directive.isVisibleOnHover.subscribe((hoverEnabled) => expect(hoverEnabled).toBe(true));
        }));
    });

    describe('onClick', () => {
        it('should set popupPosition on popupDirective', () => {
            directive = createDirective(parentRef);
            const position = { position: 'fixed' };
            // @ts-ignore access private member
            directive.getPosition = jest.fn(() => position);

            directive.onClick({ stopPropagation: jest.fn(), preventDefault: jest.fn() } as any as MouseEvent);
            expect(directive.popupDirective.popupPosition).toBe(position);
        });
    });

    describe('onHover', () => {
        const position = { position: 'fixed' };
        let mockPopup: PopupComponent;

        beforeEach(() => {
            mockPopup = { show: jest.fn() } as any as PopupComponent;
        });

        it('should do nothing on mobile', () => {
            directive = createDirective(parentRef, 'mobile');
            directive.popupDirective.paPopup = mockPopup;
            directive.onHover();
            expect(mockPopup.show).not.toHaveBeenCalled();
        });

        describe('on desktop', () => {
            beforeEach(() => {
                directive = createDirective(parentRef, 'desktop');
                directive.popupDirective.paPopup = mockPopup;
                // @ts-ignore access private member
                directive.getPosition = jest.fn(() => position);
            });

            it('should show popup on desktop', () => {
                directive.onHover();
                expect(mockPopup.show).toHaveBeenCalledWith(position);
            });

            it('should not show disabled popup', () => {
                directive.popupDirective.popupDisabled = true;
                directive.onHover();
                expect(mockPopup.show).not.toHaveBeenCalled();
            });

            it('should not show popup already visible', () => {
                mockPopup.isDisplayed = true;
                directive.onHover();
                expect(mockPopup.show).not.toHaveBeenCalled();
            });
        });
    });

    describe('onLeave', () => {
        let mockPopup: PopupComponent;

        beforeEach(() => {
            mockPopup = { close: jest.fn() } as any as PopupComponent;
        });

        it('should do nothing on mobile', () => {
            directive = createDirective(parentRef, 'mobile');
            directive.popupDirective.paPopup = mockPopup;
            directive.onLeave();
            expect(mockPopup.close).not.toHaveBeenCalled();
        });

        describe('on desktop', () => {
            beforeEach(() => {
                directive = createDirective(parentRef, 'desktop');
                directive.popupDirective.paPopup = mockPopup;
            });

            it('should do nothing when popup is disabled', () => {
                directive.popupDirective.popupDisabled = true;
                directive.onLeave();
                expect(mockPopup.close).not.toHaveBeenCalled();
            });

            it('should do nothing when popup is not displayed', () => {
                mockPopup.isDisplayed = false;
                directive.onLeave();
                expect(mockPopup.close).not.toHaveBeenCalled();
            });

            it('should close popup when it is displayed', () => {
                mockPopup.isDisplayed = true;
                directive.onLeave();
                expect(mockPopup.close).toHaveBeenCalled();
            });
        });
    });

    describe('getPosition', () => {
        const parentRect = {
            height: 150,
            width: 100,
            top: 50,
            left: 150,
            bottom: 200,
        };

        beforeEach(() => {
            parentRef.nativeElement.getBoundingClientRect.mockReturnValue(parentRect);
            directive = createDirective(parentRef);
        });

        it('should position the top of popover at the bottom of the parent element', () => {
            // @ts-ignore access private member
            const position = directive.getPosition();
            expect(position.position).toBe('fixed');
            expect(position.top).toBe(`${parentRect.bottom}px`);
        });

        it('should position the left of the popover on the left of the parent element', () => {
            // @ts-ignore access private member
            const position = directive.getPosition();
            expect(position.left).toBe(`${parentRect.left}px`);
            expect(position.position).toBe('fixed');
        });

        it('should translate Y by the offset (8px by default) and translate X of -50% plus the half of the parent width', () => {
            // @ts-ignore access private member
            let position = directive.getPosition();
            expect(position.transform).toBe(`translateX(calc(-50% + ${parentRect.width}px/2)) translateY(8px)`);

            directive.paPopoverOffset = '4px';
            // @ts-ignore access private member
            position = directive.getPosition();
            expect(position.transform).toBe(`translateX(calc(-50% + ${parentRect.width}px/2)) translateY(4px)`);
        });
    });
});
