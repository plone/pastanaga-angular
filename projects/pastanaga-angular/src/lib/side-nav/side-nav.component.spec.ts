import { CommonModule } from '@angular/common';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockModule } from 'ng-mocks';
import { SideNavComponent } from './side-nav.component';
import { PaButtonModule } from '../button/button.module';
import { ReplaySubject, Subject } from 'rxjs';
import { TranslatePipe } from '../translate/translate.pipe';
import { PastanagaService } from '../pastanaga.service';
import { createSpyObject, mockProvider } from '@ngneat/spectator';
import { BreakpointObserver, ViewportMode } from '../breakpoint-observer/breakpoint.observer';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SideNavComponent', () => {
    let spectator: Spectator<SideNavComponent>;
    let component: SideNavComponent;
    const currentMode: ReplaySubject<ViewportMode> = new ReplaySubject<ViewportMode>(1);
    const toggle: Subject<boolean> = new Subject<boolean>();
    const createComponent = createComponentFactory({
        component: SideNavComponent,
        imports: [MockModule(CommonModule), MockModule(PaButtonModule)],
        mocks: [TranslatePipe],
        providers: [
            mockProvider(PastanagaService, {
                breakpoint: createSpyObject(BreakpointObserver, {
                    currentMode,
                }),
            }),
        ],
        detectChanges: false,
    });

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
        component.toggle = toggle;
    });

    describe('when visible is true', () => {
        describe(`desktop`, () => {
            beforeEach(() => {
                currentMode.next('desktop');
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
                currentMode.next('tablet');
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
                currentMode.next('mobile');
                component.visible = true;
                spectator.detectComponentChanges();
            });

            it(`should display a navbar`, () => {
                expect(spectator.query('.pa-side-nav')).toBeTruthy();
            });

            it(`should not have an overlay`, () => {
                expect(spectator.query('.pa-side-nav-tablet-overlay')).toBe(null);
            });

            it(`should have a close button`, () => {
                expect(spectator.query('.pa-close-side-nav-button')).toBeTruthy();
            });
        });
    });
    describe('when visible is false', () => {
        beforeEach(() => {
            component.visible = false;
            spectator.detectComponentChanges();
        });
        it(`should display nothing`, () => {
            expect(spectator.query('.pa-side-nav')).toBeFalsy();
            expect(spectator.query('.pa-side-nav-tablet-overlay')).toBeFalsy();
            expect(spectator.query('.pa-close-side-nav-button')).toBeFalsy();
        });
    });

    describe('closeSideNav', () => {
        beforeEach(() => {
            currentMode.next('tablet');
            component.ngOnInit();
        });
        it('should close side nav', fakeAsync(() => {
            component.closeSideNav();
            tick(1000);
            expect(component._visible).toBeFalsy();
            expect(spectator.query('.pa-side-nav')).toBeFalsy();
            expect(spectator.query('.pa-side-nav-tablet-overlay')).toBeFalsy();
            expect(spectator.query('.pa-close-side-nav-button')).toBeFalsy();
        }));
    });
});
