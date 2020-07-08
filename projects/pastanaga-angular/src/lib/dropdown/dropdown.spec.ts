import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownComponent } from './dropdown.component';
import { OptionHeaderComponent } from './option-header/option-header.component';
import { OptionComponent } from './option/option.component';
import { SeparatorComponent } from './separator/separator.component';
import { PaIconModule } from '../icon/icon.module';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../testing';

@Component({
    template: ` <pa-dropdown [stayVisible]="stayVisible" #dropdown>
        <pa-option-header>Menu list header</pa-option-header>
        <pa-option glyph="settings" id="menu-item-1" (selectOption)="onSelect($event)">Menu list item 1</pa-option>
        <pa-option disabled glyph="settings" id="menu-item-2" (selectOption)="onSelect($event)"
            >Menu list item 2</pa-option
        >
        <pa-option glyph="settings" id="menu-item-3" (selectOption)="onSelect($event)">Menu list item 3</pa-option>
        <pa-separator></pa-separator>
        <pa-option glyph="delete" destructive id="menu-item-destructive" (selectOption)="onSelect($event)"
            >Menu item destructive</pa-option
        >
    </pa-dropdown>`,
})
export class TestComponent {
    @ViewChild('dropdown') dropdown?: DropdownComponent;
    stayVisible = false;
}

describe('Dropdown', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [...TESTING_IMPORTS, PaIconModule],
            providers: [...TESTING_PROVIDERS],
            declarations: [
                DropdownComponent,
                OptionHeaderComponent,
                OptionComponent,
                SeparatorComponent,
                TestComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be hidden by default and render options, headers and separators', () => {
        expect(fixture.debugElement.query(By.css('.pa-popup')).properties.hidden).toBe(true);
        component.dropdown?.show({});
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.pa-popup')).properties.hidden).toBe(false);
        expect(fixture.debugElement.queryAll(By.css('.pa-option')).length).toBe(4);
        expect(fixture.debugElement.queryAll(By.css('.pa-option-header')).length).toBe(1);
        expect(fixture.debugElement.queryAll(By.css('.pa-separator')).length).toBe(1);
    });
});
