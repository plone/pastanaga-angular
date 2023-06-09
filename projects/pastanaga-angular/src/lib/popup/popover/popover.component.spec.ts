import { PopoverComponent } from './popover.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from '@ng-web-apis/common';

describe('PopoverComponent', () => {
  const createComponent = createComponentFactory({
    component: PopoverComponent,
    providers: [{ provide: WINDOW, useValue: { innerWidth: 400, innerHeight: 300 } }],
  });
  let component: PopoverComponent;
  let spectator: Spectator<PopoverComponent>;
  let popoverElement: any;

  const initialRect = {
    height: 100,
    width: 200,
    left: 50,
    right: 250,
    bottom: 250,
  };
  const popupRect: BehaviorSubject<any> = new BehaviorSubject<any>(initialRect);

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    popoverElement = component.element.nativeElement.firstElementChild;
    popoverElement.getBoundingClientRect = jest.fn(() => popupRect.value);
  });

  describe('adjust', () => {
    beforeEach(() => {
      jest.spyOn(component.renderer, 'removeClass');
      jest.spyOn(component.renderer, 'addClass');
    });

    it('should add pa-visible class after adjusting popup position', () => {
      expect(component.adjust()).toBe(true);
      expect(spectator.query('.pa-popup')?.classList).toContain('pa-visible');
    });

    it('should remove all arrow classes', () => {
      component.adjust();
      expect(component.renderer.removeClass).toHaveBeenCalledWith(popoverElement, 'arrow-left');
      expect(component.renderer.removeClass).toHaveBeenCalledWith(popoverElement, 'arrow-right');
      expect(component.renderer.removeClass).toHaveBeenCalledWith(popoverElement, 'arrow-top');
    });

    it('should display popover with an arrow on top when there is enough space centered below the parent', () => {
      component.adjust();
      expect(component.renderer.addClass).toHaveBeenCalledWith(popoverElement, 'arrow-top');
    });

    it('should display popover with an arrow on the right when there is not enough space centered below the parent', () => {
      popupRect.next({ ...initialRect, bottom: 350 });
      component.adjust();
      expect(component.renderer.addClass).toHaveBeenCalledWith(popoverElement, 'arrow-right');
    });

    it('should display popover with an arrow on the left when there is not enough space below and on the left', () => {
      popupRect.next({ ...initialRect, bottom: 350, left: -50 });
      component.adjust();
      expect(component.renderer.addClass).toHaveBeenCalledWith(popoverElement, 'arrow-left');
    });

    it('should display popover with an arrow on the right when there is not enough space on the right to display the full popover', () => {
      popupRect.next({ ...initialRect, right: 450, left: 250 });
      component.adjust();
      expect(component.renderer.addClass).toHaveBeenCalledWith(popoverElement, 'arrow-right');
    });

    it('should display popover with an arrow on the left when there is not enough space on the left to display the full popover', () => {
      popupRect.next({ ...initialRect, right: 150, left: -50 });
      component.adjust();
      expect(component.renderer.addClass).toHaveBeenCalledWith(popoverElement, 'arrow-left');
    });
  });

  describe('close', () => {
    it('should remove pa-visible class', () => {
      const popup = spectator.query('.pa-popup');
      popup?.classList.add('pa-visible');
      component.close();
      expect(popup?.classList).not.toContain('pa-visible');
    });
  });
});
