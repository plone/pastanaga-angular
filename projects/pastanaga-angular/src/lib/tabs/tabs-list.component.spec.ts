import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { TabsListComponent } from './tabs-list.component';
import { TabItemComponent } from './tab-item.component';
import { MockComponent, MockModule, ngMocks } from 'ng-mocks';
import { Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { PaIconModule } from '../icon';

@Component({ template: '', standalone: false })
class TestComponent {
  selectedTab = 'tab1';
}

describe('TabsListComponent', () => {
  let spectator: SpectatorHost<TabsListComponent, TestComponent>;
  let component: TabsListComponent;
  const createHost = createHostFactory({
    component: TabsListComponent,
    host: TestComponent,
    imports: [MockModule(PaIconModule)],
    declarations: [TabsListComponent, MockComponent(TabItemComponent)],
    detectChanges: false,
  });

  const tabsSelected = [new Subject<void>(), new Subject<void>(), new Subject<void>()];
  const tabsRect = [
    jest.fn(() => {
      return { x: 10, width: 10 };
    }),
    jest.fn(() => {
      return { x: 20, width: 20 };
    }),
    jest.fn(() => {
      return { x: 30, width: 30 };
    }),
  ];

  beforeEach(() => {
    spectator = createHost(`<pa-tabs>
            <pa-tab (click)="selectedTab = 'tab1'"
                    [active]="selectedTab === 'tab1'">Tab1</pa-tab>
            <pa-tab (click)="selectedTab = 'tab2'"
                    [active]="selectedTab === 'tab2'">Tab2</pa-tab>
            <pa-tab (click)="selectedTab = 'tab3'"
                    [active]="selectedTab === 'tab3'">Tab3</pa-tab>
        </pa-tabs>`);
    component = spectator.component;
    // @ts-ignore accessing private member
    component.ref.nativeElement.getBoundingClientRect = jest.fn(() => ({ x: 5 }));
    ngMocks.findAll(spectator.debugElement, TabItemComponent).forEach((debugElement, index) => {
      debugElement.componentInstance.selected = tabsSelected[index];
      debugElement.componentInstance.getTabRect = tabsRect[index];
      if (index === 0) {
        debugElement.componentInstance.active = true;
      }
    });
  });
  it('should set slider style at start', fakeAsync(() => {
    spectator.detectChanges();
    tick();
    expect(component.sliderStyle).toEqual('left: 5px; width: 10px');
  }));
  it('should set slider style when tabItem selected', fakeAsync(() => {
    spectator.detectChanges();
    tick();
    tabsSelected[1].next();
    tick();
    expect(component.sliderStyle).toEqual('left: 15px; width: 20px');
    tabsSelected[2].next();
    tick();
    expect(component.sliderStyle).toEqual('left: 25px; width: 30px');
  }));
});
