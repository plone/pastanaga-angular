import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellMenuComponent } from './table-cell-menu.component';
import { MockModule } from 'ng-mocks';
import { PaFocusableModule } from '../../..';

describe('TableCellMenuComponent', () => {
    let component: TableCellMenuComponent;
    let fixture: ComponentFixture<TableCellMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableCellMenuComponent],
            imports: [MockModule(PaFocusableModule)],
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
