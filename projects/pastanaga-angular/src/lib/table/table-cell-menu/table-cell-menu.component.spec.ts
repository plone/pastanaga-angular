import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockModule } from 'ng-mocks';
import { TableCellMenuComponent } from './table-cell-menu.component';
import { PaFocusableModule } from '../../focusable/focusable.module';

describe('TableCellMenuComponent', () => {
    let component: TableCellMenuComponent;
    let fixture: ComponentFixture<TableCellMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableCellMenuComponent],
            imports: [MockModule(PaFocusableModule)],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableCellMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
