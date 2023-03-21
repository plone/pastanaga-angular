import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TableHeaderDirective } from './table.directives';
import { TableRowHeaderComponent } from './table-row-header/table-row-header.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableComponent } from './table.component';
import { MockModule } from 'ng-mocks';
import { PaFocusableModule } from '../focusable/focusable.module';

@Component({
    template: ` <pa-table [columns]="columns" #table [noHeader]="noHeader">
        <pa-table-header #header>
            <pa-table-cell header clickable id="header-cell-1">Name</pa-table-cell>
            <pa-table-cell header id="header-cell-2">Tags</pa-table-cell>
            <pa-table-cell header>Size</pa-table-cell>
        </pa-table-header>
        <pa-table-row-header>Today</pa-table-row-header>
        <pa-table-row hoverable id="row-1">
            <pa-table-cell header id="cell-1">My_text_file.txt</pa-table-cell>
            <pa-table-cell id="cell-2">Bonjour, Occitania, França, Jenesepas</pa-table-cell>
            <pa-table-cell>100 MB</pa-table-cell>
        </pa-table-row>
        <pa-table-row id="row-2">
            <pa-table-cell header>My_text_file.txt</pa-table-cell>
            <pa-table-cell>Bonjour, Occitania, França, Jenesepas</pa-table-cell>
            <pa-table-cell>100 MB</pa-table-cell>
        </pa-table-row>
    </pa-table>`,
})
export class TestComponent {
    @ViewChild('table') table?: TableComponent;
    @ViewChild('header') header?: TableHeaderDirective;
    noHeader = false;
    columns = 'repeat(3, 1fr)';
}

describe('Table', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MockModule(PaFocusableModule)],
            declarations: [
                TableComponent,
                TableRowComponent,
                TableCellComponent,
                TableRowHeaderComponent,
                TableHeaderDirective,
                TestComponent,
            ],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should allow to hide header', () => {
        expect(fixture.debugElement.query(By.css('.pa-table-grid--head'))).toBeTruthy();
        component.noHeader = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.pa-table-grid--head'))).toBeFalsy();
    });

    it('should set grid-template-columns css attribute', () => {
        expect(fixture.debugElement.query(By.css('.pa-table-grid')).styles['grid-template-columns']).toEqual(
            'repeat(3, 1fr)',
        );
        component.columns = '60px 50px 40px';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.pa-table-grid')).styles['grid-template-columns']).toEqual(
            '60px 50px 40px',
        );
    });

    it('should set the clickable class on rows', () => {
        expect(fixture.debugElement.query(By.css('#row-1 .pa-table-grid--row.pa-clickable'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#row-2 .pa-table-grid--row.pa-clickable'))).toBeFalsy();
    });

    it('should set the clickable class on headers', () => {
        expect(fixture.debugElement.query(By.css('#header-cell-1 .pa-table-grid--header.pa-clickable'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#header-cell-2 .pa-table-grid--header.pa-clickable'))).toBeFalsy();
    });

    it('should support regular cells and header cells', () => {
        expect(fixture.debugElement.query(By.css('#cell-1 .pa-table-grid--header'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#cell-1 .pa-table-grid--cell'))).toBeFalsy();
        expect(fixture.debugElement.query(By.css('#cell-2 .pa-table-grid--header'))).toBeFalsy();
        expect(fixture.debugElement.query(By.css('#cell-2 .pa-table-grid--cell'))).toBeTruthy();
    });
});
