import { ExtendedPopupDirective, PopoverDirective } from './popover.directive';
import { ElementRef } from '@angular/core';
import { BreakpointObserver, ViewportMode } from '../../breakpoint-observer/breakpoint.observer';
import { BehaviorSubject } from 'rxjs';
import { PopoverComponent } from './popover.component';
import { waitForAsync } from '@angular/core/testing';
import { PopupComponent } from '../popup.component';

describe('PopoverDirective', () => {
    let directive: PopoverDirective;
    let popupDirective: ExtendedPopupDirective;
    let blockParentRef: ElementRef;
    let flexParentRef: ElementRef;
    const window: Window = ({
        getComputedStyle: jest.fn((element) => element.style),
    } as any) as Window;
    let popoverComponent: PopoverComponent;

    const createDirective: (parentElement: ElementRef, mode?: ViewportMode) => PopoverDirective = (
        parentElement: ElementRef,
        mode = 'desktop',
    ) => {
        const breakpoint = ({ currentMode: new BehaviorSubject(mode) } as any) as BreakpointObserver;
        return new PopoverDirective(popupDirective, parentElement, breakpoint, window);
    };

    beforeEach(() => {
        popupDirective = {} as ExtendedPopupDirective;
        blockParentRef = {
            nativeElement: {
                getBoundingClientRect: jest.fn(),
                parentElement: { style: { display: 'block' } },
            },
        };
        flexParentRef = {
            nativeElement: {
                getBoundingClientRect: jest.fn(),
                parentElement: { style: { display: 'flex' } },
            },
        };
        popoverComponent = {} as PopoverComponent;
    });

    describe('paPopover setter', () => {
        it('should set hasFlexParent on the directive and the component', () => {
            directive = createDirective(blockParentRef);
            directive.paPopover = popoverComponent;
            expect(directive.hasFlexParent).toBe(false);
            expect(popoverComponent.hasFlexParent).toBe(false);

            directive = createDirective(flexParentRef);
            directive.paPopover = popoverComponent;
            expect(directive.hasFlexParent).toBe(true);
            expect(popoverComponent.hasFlexParent).toBe(true);
        });

        it('should set directive holder element in the component', () => {
            directive = createDirective(blockParentRef);
            directive.paPopover = popoverComponent;
            expect(popoverComponent.popoverHolder).toBe(blockParentRef.nativeElement);
        });

        it('should set the component in paPopup property of the popup directive', () => {
            directive = createDirective(blockParentRef);
            directive.paPopover = popoverComponent;
            expect(directive.popupDirective.paPopup).toBe(popoverComponent);
        });
    });

    describe('isVisibleOnHover', () => {
        it(
            'should be false on mobile',
            waitForAsync(() => {
                directive = createDirective(blockParentRef, 'mobile');
                directive.isVisibleOnHover.subscribe((hoverEnabled) => expect(hoverEnabled).toBe(false));
            }),
        );

        it(
            'should be false on tablet',
            waitForAsync(() => {
                directive = createDirective(blockParentRef, 'tablet');
                directive.isVisibleOnHover.subscribe((hoverEnabled) => expect(hoverEnabled).toBe(false));
            }),
        );

        it(
            'should be true on desktop',
            waitForAsync(() => {
                directive = createDirective(blockParentRef, 'desktop');
                directive.isVisibleOnHover.subscribe((hoverEnabled) => expect(hoverEnabled).toBe(true));
            }),
        );
    });

    describe('onClick', () => {
        it('should set popupPosition on popupDirective', () => {
            directive = createDirective(blockParentRef);
            const position = { position: 'fixed' };
            // @ts-ignore access private member
            directive.getPosition = jest.fn(() => position);

            directive.onClick(({ stopPropagation: jest.fn(), preventDefault: jest.fn() } as any) as MouseEvent);
            expect(directive.popupDirective.popupPosition).toBe(position);
        });
    });

    describe('onHover', () => {
        const position = { position: 'fixed' };
        let mockPopup: PopupComponent;

        beforeEach(() => {
            mockPopup = ({ show: jest.fn() } as any) as PopupComponent;
        });

        it('should do nothing on mobile', () => {
            directive = createDirective(blockParentRef, 'mobile');
            directive.popupDirective.paPopup = mockPopup;
            directive.onHover();
            expect(mockPopup.show).not.toHaveBeenCalled();
        });

        describe('on desktop', () => {
            beforeEach(() => {
                directive = createDirective(blockParentRef, 'desktop');
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
            mockPopup = ({ close: jest.fn() } as any) as PopupComponent;
        });

        it('should do nothing on mobile', () => {
            directive = createDirective(blockParentRef, 'mobile');
            directive.popupDirective.paPopup = mockPopup;
            directive.onLeave();
            expect(mockPopup.close).not.toHaveBeenCalled();
        });

        describe('on desktop', () => {
            beforeEach(() => {
                directive = createDirective(blockParentRef, 'desktop');
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
            bottom: 200,
        };

        describe('on flex parent', () => {
            beforeEach(() => {
                flexParentRef.nativeElement.getBoundingClientRect.mockReturnValue(parentRect);
            });

            it('should position the top of the popover at the top of the parent element', () => {
                directive = createDirective(flexParentRef);
                directive.hasFlexParent = true;
                // @ts-ignore access private member
                const position = directive.getPosition();
                expect(position.position).toBe('fixed');
                expect(position.top).toBe(`${parentRect.top}px`);
            });

            it('on desktop, should translate Y of 8px and translate X 50% minus the half of the parent width', () => {
                directive = createDirective(flexParentRef);
                directive.hasFlexParent = true;
                // @ts-ignore access private member
                const position = directive.getPosition();
                expect(position.transform).toBe(`translateX(calc(-50% - ${parentRect.width}px/2)) translateY(8px)`);
            });

            it('on tablet, should translate Y of 50% plus 16px and translate X 50% minus the half of the parent width', () => {
                directive = createDirective(flexParentRef, 'tablet');
                directive.hasFlexParent = true;
                // @ts-ignore access private member
                const position = directive.getPosition();
                expect(position.transform).toBe(
                    `translateX(calc(-50% - ${parentRect.width}px/2)) translateY(calc(-50% + 16px))`,
                );
            });
        });

        describe('on block parent', () => {
            beforeEach(() => {
                blockParentRef.nativeElement.getBoundingClientRect.mockReturnValue(parentRect);
                directive = createDirective(blockParentRef);
            });

            it('should position the top of popover at the bottom of the parent element', () => {
                // @ts-ignore access private member
                const position = directive.getPosition();
                expect(position.position).toBe('fixed');
                expect(position.top).toBe(`${parentRect.bottom}px`);
            });

            it('should translate Y of 8px and translate X of 50% plus the half of the parent width', () => {
                // @ts-ignore access private member
                const position = directive.getPosition();
                expect(position.transform).toBe(`translateX(calc(-50% + ${parentRect.width}px/2)) translateY(8px)`);
            });
        });
    });
});
