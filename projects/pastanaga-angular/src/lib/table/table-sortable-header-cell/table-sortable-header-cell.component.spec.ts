import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TableSortableHeaderCellComponent } from './table-sortable-header-cell.component';
import { MockModule } from 'ng-mocks';
import { PaIconModule } from '../../icon/icon.module';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, ViewportMode } from '../../breakpoint-observer/breakpoint.observer';
import { fakeAsync } from '@angular/core/testing';

describe('TableSortableHeaderCellComponent', () => {
    const mode: BehaviorSubject<ViewportMode> = new BehaviorSubject('desktop');
    const createComponent = createComponentFactory({
        imports: [MockModule(PaIconModule)],
        component: TableSortableHeaderCellComponent,
        providers: [
            {
                provide: BreakpointObserver,
                useValue: {
                    currentMode: mode.asObservable(),
                },
            },
        ],
        detectChanges: false,
    });
    let spectator: Spectator<TableSortableHeaderCellComponent>;
    let component: TableSortableHeaderCellComponent;

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    describe('on desktop', () => {
        it('should display a chevron-up icon when not active', fakeAsync(() => {
            // @ts-ignore access private member
            component.updateIcon();
            expect(component.icon).toBe('chevron-up');
        }));

        it('should display an arrow-down icon when active and NOT descending', fakeAsync(() => {
            component.active = true;
            // @ts-ignore access private member
            component.updateIcon();
            expect(component.icon).toBe('arrow-down');
        }));

        it('should display an arrow-up icon when active and descending', fakeAsync(() => {
            component.active = true;
            component.isDescending = true;
            // @ts-ignore access private member
            component.updateIcon();
            expect(component.icon).toBe('arrow-up');
        }));
    });

    it('should display a chevron-down icon on mobile', fakeAsync(() => {
        mode.next('mobile');
        // @ts-ignore access private member
        component.updateIcon();
        expect(component.icon).toBe('chevron-down');
    }));
});
