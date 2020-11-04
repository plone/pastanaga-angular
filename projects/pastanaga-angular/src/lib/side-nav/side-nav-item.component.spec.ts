import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SideNavItemComponent } from './side-nav-item.component';

describe('SideNavItem', () => {
    let spectator: Spectator<SideNavItemComponent>;
    let component: SideNavItemComponent;
    const createComponent = createComponentFactory({
        component: SideNavItemComponent,
        detectChanges: false,
    });

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('should display a header', () => {
        component.header = true;
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('header')).toBeTruthy();
        expect(spectator.query('h2')).toBeTruthy();
        expect(spectator.query('span')).toBeFalsy();
    });

    it('should not display a header', () => {
        component.header = false;
        spectator.detectComponentChanges();
        expect(spectator.query('span')).toBeTruthy();
        expect(spectator.query('li')?.classList.contains('header')).toBeFalsy();
        expect(spectator.query('h2')).toBeFalsy();
    });

    it('should have inverted class', () => {
        component.inverted = true;
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('inverted')).toBeTruthy();
    });

    it('should not have inverted class', () => {
        component.inverted = false;
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('inverted')).toBeFalsy();
    });

    it('should have active class', () => {
        component.active = true;
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('active')).toBeTruthy();
    });

    it('should not have active class', () => {
        component.active = false;
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('active')).toBeFalsy();
    });
});
