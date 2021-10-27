import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {
    SORTABLE_ICON,
    SORTED_ASCENDING_ICON,
    SORTED_DESCENDING_ICON,
    TableSortableHeaderCellComponent,
} from './table-sortable-header-cell.component';
import { MockModule } from 'ng-mocks';
import { PaIconModule } from '../../icon/icon.module';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, ViewportMode } from '../../breakpoint-observer';
import { fakeAsync } from '@angular/core/testing';

describe('TableSortableHeaderCellComponent', () => {
    const mode: BehaviorSubject<ViewportMode> = new BehaviorSubject('desktop' as ViewportMode);
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
        it('should display a chevron-down icon when not enabled', fakeAsync(() => {
            // @ts-ignore access private member
            component.updateIcon();
            expect(component.icon).toBe(SORTABLE_ICON);
        }));

        it('should display an arrow-down icon when enabled and NOT descending', fakeAsync(() => {
            component.enabled = true;
            // @ts-ignore access private member
            component.updateIcon();
            expect(component.icon).toBe(SORTED_ASCENDING_ICON);
        }));

        it('should display an arrow-up icon when enabled and descending', fakeAsync(() => {
            component.enabled = true;
            component.isDescending = true;
            // @ts-ignore access private member
            component.updateIcon();
            expect(component.icon).toBe(SORTED_DESCENDING_ICON);
        }));
    });

    it('should display a chevron-down icon on mobile', fakeAsync(() => {
        mode.next('mobile');
        // @ts-ignore access private member
        component.updateIcon();
        expect(component.icon).toBe(SORTABLE_ICON);
    }));
});
