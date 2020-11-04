import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockModule } from 'ng-mocks';
import { PaFocusableModule } from '../focusable/focusable.module';
import { SideNavItemComponent } from './side-nav-item.component';

describe('SideNavItem', () => {
    let spectator: Spectator<SideNavItemComponent>;
    let component: SideNavItemComponent;
    const createComponent = createComponentFactory({
        component: SideNavItemComponent,
        imports: [MockModule(PaFocusableModule)],
        detectChanges: false,
    });

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('should display a header when header input is set to true', () => {
        component.header = true;
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('header')).toBeTruthy();
        expect(spectator.query('h2')).toBeTruthy();
        expect(spectator.query('span')).toBeFalsy();
    });

    it('should not display a header by default', () => {
        spectator.detectComponentChanges();
        expect(spectator.query('span')).toBeTruthy();
        expect(spectator.query('li')?.classList.contains('header')).toBeFalsy();
        expect(spectator.query('h2')).toBeFalsy();
    });

    it('should have inverted class when inverted input is set to true', () => {
        component.inverted = true;
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('inverted')).toBeTruthy();
    });

    it('should not be inverted by default', () => {
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('inverted')).toBeFalsy();
    });

    it('should have active class when active input is set to true', () => {
        component.active = true;
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('active')).toBeTruthy();
    });

    it('should not be active by default', () => {
        spectator.detectComponentChanges();
        expect(spectator.query('li')?.classList.contains('active')).toBeFalsy();
    });
});
