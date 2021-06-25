import { PopoverComponent } from './popover.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from '@ng-web-apis/common';

describe('PopoverComponent', () => {
    const createComponent = createComponentFactory({
        component: PopoverComponent,
        providers: [{ provide: WINDOW, useValue: { innerWidth: 400 } }],
    });
    let component: PopoverComponent;
    let spectator: Spectator<PopoverComponent>;
    let popupElement: any;

    const initialRect = {
        height: 100,
        width: 200,
        left: 50,
        right: 250,
        top: 0,
    };
    const popupRect: BehaviorSubject<any> = new BehaviorSubject<any>(initialRect);

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
        popupElement = component.element.nativeElement.firstElementChild;
        popupElement.getBoundingClientRect = jest.fn(() => popupRect.value);
    });

    it('should add o-visible class after adjusting popup position', () => {
        expect(component.adjust()).toBe(true);
        expect(spectator.query('.pa-popup')?.classList).toContain('o-visible');
    });

    it('should remove o-visible class when closing', () => {
        const popup = spectator.query('.pa-popup');
        popup?.classList.add('o-visible');
        component.close();
        expect(popup?.classList).not.toContain('o-visible');
    });

    describe('adjust', () => {
        // TODO
    });
});
