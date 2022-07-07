import { CommonModule } from '@angular/common';
import { createComponentFactory, Spectator, mockProvider } from '@ngneat/spectator/jest';
import { MockModule } from 'ng-mocks';
import { SideNavComponent } from './side-nav.component';
import { PaButtonModule } from '../button/button.module';
import { ReplaySubject } from 'rxjs';
import { BreakpointObserver, ViewportMode } from '../breakpoint-observer';

describe('SideNavComponent', () => {
    let spectator: Spectator<SideNavComponent>;
    let component: SideNavComponent;
    const currentModeTest: ReplaySubject<ViewportMode> = new ReplaySubject<ViewportMode>(1);
    const createComponent = createComponentFactory({
        component: SideNavComponent,
        imports: [MockModule(CommonModule), MockModule(PaButtonModule)],
        providers: [
            mockProvider(BreakpointObserver, {
                currentMode: currentModeTest,
            }),
        ],
        detectChanges: false,
    });

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    describe('when visible is true', () => {
        describe(`desktop`, () => {
            beforeEach(() => {
                currentModeTest.next('desktop');
                spectator.detectComponentChanges();
            });
            it(`should display a navbar`, () => {
                expect(spectator.query('.pa-side-nav')).toBeTruthy();
            });
            it(`should not have an overlay`, () => {
                expect(spectator.query('.pa-side-nav-tablet-overlay')).toBe(null);
            });
            it(`should not display close button`, () => {
                expect(spectator.query('.pa-close-side-nav-button')).toBe(null);
            });
        });

        describe(`tablet`, () => {
            beforeEach(() => {
                component.mode = 'tablet';
                component.visible = true;
                spectator.detectComponentChanges();
            });

            it(`should display a navbar`, () => {
                expect(spectator.query('.pa-side-nav')).toBeTruthy();
            });

            it(`should have an overlay`, () => {
                expect(spectator.query('.pa-side-nav-tablet-overlay')).toBeTruthy();
            });

            it(`should have a close button`, () => {
                expect(spectator.query('.pa-close-side-nav-button')).toBeTruthy();
            });
        });

        describe(`mobile`, () => {
            beforeEach(() => {
                component.mode = 'mobile';
                component.visible = true;
                spectator.detectComponentChanges();
            });

            it(`should display a navbar`, () => {
                expect(spectator.query('.pa-side-nav')).toBeTruthy();
            });

            it(`should have an overlay`, () => {
                expect(spectator.query('.pa-side-nav-tablet-overlay')).toBeTruthy();
            });

            it(`should have a close button`, () => {
                expect(spectator.query('.pa-close-side-nav-button')).toBeTruthy();
            });
        });
    });
    describe('when visible is false', () => {
        beforeEach(() => {
            component.visible = false;
        });

        it(`should display the sidenav on desktop`, () => {
            component.mode = 'desktop';
            spectator.detectComponentChanges();
            expect(spectator.query('.pa-side-nav')).toBeTruthy();
            expect(spectator.query('.pa-side-nav-tablet-overlay')).toBeFalsy();
            expect(spectator.query('.pa-close-side-nav-button')).toBeFalsy();
        });

        it(`should display nothing on mobile`, () => {
            component.mode = 'mobile';
            spectator.detectComponentChanges();
            expect(spectator.query('.pa-side-nav')).toBeFalsy();
            expect(spectator.query('.pa-side-nav-tablet-overlay')).toBeFalsy();
            expect(spectator.query('.pa-close-side-nav-button')).toBeFalsy();
        });
    });

    describe('closeSideNav', () => {
        beforeEach(() => {
            component.mode = 'tablet';
        });
        it('should trigger next function from close subject', () => {
            const spy = jest.spyOn(component.close, 'emit');
            component.closeSideNav();
            expect(spy).toBeCalled();
        });
    });
});
