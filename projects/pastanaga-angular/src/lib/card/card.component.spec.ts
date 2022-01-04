import { CardComponent } from './card.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Keys } from '../common';

describe('CardComponent', () => {
    let createComponent = createComponentFactory({
        component: CardComponent,
        detectChanges: false,
    })
    let component: CardComponent;
    let spectator: Spectator<CardComponent>;

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('should be enabled and unselected by default', () => {
        spectator.detectChanges();
        const classList = spectator.query('.pa-card-wrapper')?.classList;
        expect(classList?.length).toBe(1);
        expect(classList).toContain('pa-card-wrapper');
    });

    it('should apply disabled style when disabled', () => {
        component.disabled = true;
        spectator.detectChanges();
        expect(spectator.query('.pa-card-wrapper')?.classList).toContain('pa-disabled')
    });

    describe('cardClick event', () => {
        beforeEach(() => {
            jest.spyOn(component.cardClick, 'emit')
        });

        it('should be emitted when clicking on the card content', () => {
            spectator.detectChanges();
            spectator.click('.pa-card-content');
            expect(component.cardClick.emit).toHaveBeenCalled();
        });

        it('should be emitted when clicking on the card wrapper', () => {
            spectator.detectChanges();
            spectator.click('.pa-card-wrapper');
            expect(component.cardClick.emit).toHaveBeenCalled();
        });

        it('should be emitted when focusing and pressing enter on the card wrapper', () => {
            spectator.detectChanges();
            spectator.focus('.pa-card-wrapper');
            spectator.dispatchKeyboardEvent('.pa-card-wrapper', 'keyup', Keys.enter);
            expect(component.cardClick.emit).toHaveBeenCalled();
        });

        it('should NOT be emitted on a disabled card', () => {
            component.disabled = true;
            spectator.detectChanges();

            spectator.click('.pa-card-content');
            expect(component.cardClick.emit).not.toHaveBeenCalled();
            spectator.click('.pa-card-wrapper');
            expect(component.cardClick.emit).not.toHaveBeenCalled();
        });
    });
});
