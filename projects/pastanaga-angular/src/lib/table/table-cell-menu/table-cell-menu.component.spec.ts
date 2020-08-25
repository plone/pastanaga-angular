import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellMenuComponent } from './table-cell-menu.component';

describe('TableCellMenuComponent', () => {
    let component: TableCellMenuComponent;
    let fixture: ComponentFixture<TableCellMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableCellMenuComponent],
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
