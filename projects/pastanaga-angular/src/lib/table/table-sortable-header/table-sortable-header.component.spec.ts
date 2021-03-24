import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TableSortableHeaderComponent } from './table-sortable-header.component';
import { MockComponent, MockModule } from 'ng-mocks';
import { TableSortableHeaderCellComponent } from '../table-sortable-header-cell/table-sortable-header-cell.component';
import { TableCellMenuComponent } from '../table-cell-menu/table-cell-menu.component';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, ViewportMode } from '../../breakpoint-observer/breakpoint.observer';
import { HeaderCell, SortableHeaderCell } from '../table.models';
import { PaTranslateModule } from '../../translate/translate.module';
import { TableCellComponent } from '../table-cell/table-cell.component';

describe('TableSortableHeaderComponent', () => {
    const mode: BehaviorSubject<ViewportMode> = new BehaviorSubject<ViewportMode>('desktop');
    const createComponent = createComponentFactory({
        imports: [MockModule(PaTranslateModule)],
        declarations: [
            MockComponent(TableCellComponent),
            MockComponent(TableCellMenuComponent),
            MockComponent(TableSortableHeaderCellComponent),
        ],
        component: TableSortableHeaderComponent,
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
    let spectator: Spectator<TableSortableHeaderComponent>;
    let component: TableSortableHeaderComponent;

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('should display a menu column if menuColumn is set', () => {
        expect(spectator.query('pa-table-cell-menu')).toBeFalsy();
        component.menuColumn = true;
        spectator.detectChanges();
        expect(spectator.query('pa-table-cell-menu')).toBeTruthy();
    });

    describe('on desktop', () => {
        it('should display as many columns as provided', () => {
            component.cells = [
                new SortableHeaderCell({ id: '1', label: 'column 1' }),
                new HeaderCell({ id: '2', label: 'column 2' }),
                new SortableHeaderCell({ id: '3', label: 'sortable column' }),
            ];
            spectator.detectChanges();
            expect(spectator.queryAll('pa-table-sortable-header-cell')?.length).toBe(2);
            expect(spectator.queryAll('pa-table-cell')?.length).toBe(1);
        });

        describe('sortBy', () => {
            let cell1: SortableHeaderCell;
            let cell2: SortableHeaderCell;
            let cell3: SortableHeaderCell;
            beforeEach(() => {
                cell1 = new SortableHeaderCell({ id: '1', label: 'column 1', active: true });
                cell2 = new SortableHeaderCell({ id: '2', label: 'column 2' });
                cell3 = new SortableHeaderCell({ id: '3', label: 'column 3' });
                component.cells = [cell1, cell2, cell3];
                spyOn(component.sort, 'emit');
            });

            it('should toggle descending property of currentActive when sorting by same column', () => {
                component.sortBy('1');
                const sortedCell = new SortableHeaderCell({
                    id: '1',
                    label: 'column 1',
                    active: true,
                    descending: true,
                });
                expect(component.cells).toEqual([
                    sortedCell,
                    new SortableHeaderCell({ id: '2', label: 'column 2' }),
                    new SortableHeaderCell({ id: '3', label: 'column 3' }),
                ]);
                expect(component.sort.emit).toHaveBeenCalledWith(sortedCell);
            });

            it('should set active to true for new column and reset the old one when sorting by a different column', () => {
                component.sortBy('2');
                const sortedCell = new SortableHeaderCell({ id: '2', label: 'column 2', active: true });
                expect(component.cells).toEqual([
                    new SortableHeaderCell({ id: '1', label: 'column 1' }),
                    sortedCell,
                    new SortableHeaderCell({ id: '3', label: 'column 3' }),
                ]);
                expect(component.sort.emit).toHaveBeenCalledWith(sortedCell);
            });
        });
    });

    describe('on mobile', () => {
        beforeEach(() => {
            mode.next('mobile');
        });
        // TODO
    });
});
