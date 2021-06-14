import { EllipsisTooltipDirective, ExtendedTooltipDirective } from './ellipsis-tooltip.directive';
import { ElementRef, SimpleChange } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import spyOn = jest.spyOn;

describe('EllipsisTooltipDirective', () => {
    let directive: EllipsisTooltipDirective;
    let tooltipDirective: ExtendedTooltipDirective;
    let elementRef: ElementRef;
    let updateEllipsisTooltipSpy: jest.SpyInstance;

    beforeEach(() => {
        tooltipDirective = { type: 'action', text: '' } as ExtendedTooltipDirective;
        elementRef = {
            nativeElement: {
                offsetWidth: 100,
                scrollWidth: 100,
                style: { setProperty: jest.fn() },
                textContent: 'Text content of the element',
            },
        };
    });

    describe('ngAfterViewInit', () => {
        beforeEach(() => {
            directive = new EllipsisTooltipDirective(tooltipDirective, elementRef);
            // @ts-ignore access private member
            updateEllipsisTooltipSpy = jest.spyOn(directive, 'updateEllipsisTooltip');
        });
        it('should set style to display ellipsis if needed on parent element', () => {
            directive.ngAfterViewInit();
            expect(elementRef.nativeElement.style.setProperty).toHaveBeenCalledWith('overflow', 'hidden');
            expect(elementRef.nativeElement.style.setProperty).toHaveBeenCalledWith('text-overflow', 'ellipsis');
            expect(elementRef.nativeElement.style.setProperty).toHaveBeenCalledWith('white-space', 'nowrap');
        });

        it('should call updateEllipsisTooltip', () => {
            directive.ngAfterViewInit();
            expect(updateEllipsisTooltipSpy).toHaveBeenCalled();
        });
    });

    describe('onChanges', () => {
        beforeEach(() => {
            directive = new EllipsisTooltipDirective(tooltipDirective, elementRef);
            // @ts-ignore access private member
            updateEllipsisTooltipSpy = jest.spyOn(directive, 'updateEllipsisTooltip');
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should do nothing when there is no content', fakeAsync(() => {
            directive.ngOnChanges({});
            tick();
            expect(updateEllipsisTooltipSpy).not.toHaveBeenCalled();

            directive.ngOnChanges({ content: { currentValue: undefined } as SimpleChange });
            tick();
            expect(updateEllipsisTooltipSpy).not.toHaveBeenCalled();
        }));

        it('should do nothing on first content change', fakeAsync(() => {
            directive.ngOnChanges({ content: { currentValue: 'content', firstChange: true } as SimpleChange });
            tick();
            expect(updateEllipsisTooltipSpy).not.toHaveBeenCalled();
        }));

        it('should call updateEllipsisTooltip on second content change and following ones', fakeAsync(() => {
            directive.ngOnChanges({ content: { currentValue: 'content', firstChange: false } as SimpleChange });
            tick();
            expect(updateEllipsisTooltipSpy).toHaveBeenCalled();

            directive.ngOnChanges({ content: { currentValue: 'new Content', firstChange: false } as SimpleChange });
            tick();
            expect(updateEllipsisTooltipSpy).toHaveBeenCalledTimes(2);
        }));
    });

    describe('updateEllipsisTooltip', () => {
        it('should NOT set a tooltip when there is no ellipsis on the element', () => {
            directive = new EllipsisTooltipDirective(tooltipDirective, elementRef);
            spyOn(directive.hasEllipsis, 'emit');
            // @ts-ignore access private member
            directive.updateEllipsisTooltip();
            expect(tooltipDirective.type).toBe('action');
            expect(tooltipDirective.text).toBe('');
            expect(directive.hasEllipsis.emit).toHaveBeenCalledWith(false);
        });

        it('should set a system tooltip with element text when there is an ellipsis on the element', () => {
            elementRef.nativeElement.scrollWidth = 200;
            directive = new EllipsisTooltipDirective(tooltipDirective, elementRef);
            spyOn(directive.hasEllipsis, 'emit');
            // @ts-ignore access private member
            directive.updateEllipsisTooltip();
            expect(tooltipDirective.type).toBe('system');
            expect(tooltipDirective.text).toBe(elementRef.nativeElement.textContent);
            expect(directive.hasEllipsis.emit).toHaveBeenCalledWith(true);
        });
    });
});
