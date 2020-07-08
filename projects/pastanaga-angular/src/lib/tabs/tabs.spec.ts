import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TabsListComponent } from './tabs-list.component';
import { TabItemComponent } from './tab-item.component';
import { PaIconModule } from '../..';

@Component({
    template: `<pa-tabs #tabs>
        <pa-tab #tab1 (click)="selectedTab = 'info'" [active]="selectedTab === 'info'">Info</pa-tab>
        <pa-tab #tab2 id="settings" (click)="selectedTab = 'settings'" [active]="selectedTab === 'settings'"
            >Settings</pa-tab
        >
        <pa-tab #tab3 (click)="selectedTab = 'notifications'" [active]="selectedTab === 'notifications'"
            >Notifications</pa-tab
        >
    </pa-tabs>`,
})
export class TestComponent {
    @ViewChild('tab1') tab1?: TabItemComponent;
    @ViewChild('tab2') tab2?: TabItemComponent;
    @ViewChild('tab3') tab3?: TabItemComponent;
    selectedTab = 'info';
}

describe('Tabs', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PaIconModule],
            declarations: [TabsListComponent, TabItemComponent, TestComponent],
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

    it('should set the active class on selected tab', () => {
        expect(component.tab1?.active).toBe(true);
        expect(component.tab2?.active).toBe(false);
        expect(component.tab3?.active).toBe(false);
    });

    it('should update the active class after clicking', () => {
        fixture.debugElement.query(By.css('#settings')).nativeElement.click();
        fixture.detectChanges();
        expect(component.tab1?.active).toBe(false);
        expect(component.tab2?.active).toBe(true);
        expect(component.tab3?.active).toBe(false);
    });
});
