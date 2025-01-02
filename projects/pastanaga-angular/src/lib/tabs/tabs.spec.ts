import { Component, ViewChild } from '@angular/core';

import { TabsListComponent } from './tabs-list.component';
import { TabItemComponent } from './tab-item.component';
import { PaIconModule } from '../icon';
import { MockModule } from 'ng-mocks';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator/jest';
import { BreakpointObserver, ViewportMode } from '../breakpoint-observer';
import { of } from 'rxjs';

@Component({
  template: ``,
  standalone: false,
})
export class TestComponent {
  @ViewChild('tab1') tab1?: TabItemComponent;
  @ViewChild('tab2') tab2?: TabItemComponent;
  @ViewChild('tab3') tab3?: TabItemComponent;
  selectedTab = 'info';
}

describe('Tabs', () => {
  const createHost = createHostFactory({
    imports: [MockModule(PaIconModule)],
    component: TabsListComponent,
    host: TestComponent,
    declarations: [TabItemComponent],
    providers: [
      {
        provide: BreakpointObserver,
        useValue: {
          currentMode: of('desktop' as ViewportMode),
        },
      },
    ],
    detectChanges: false,
  });

  let spectator: SpectatorHost<TabsListComponent, TestComponent>;
  let host: TestComponent;

  beforeEach(() => {
    spectator = createHost(`<pa-tabs #tabs>
        <pa-tab #tab1 (click)="selectedTab = 'info'" [active]="selectedTab === 'info'">Info</pa-tab>
        <pa-tab #tab2 id="settings" (click)="selectedTab = 'settings'" [active]="selectedTab === 'settings'"
            >Settings
        </pa-tab>
        <pa-tab #tab3 (click)="selectedTab = 'notifications'" [active]="selectedTab === 'notifications'"
            >Notifications
        </pa-tab>
    </pa-tabs>`);
    host = spectator.hostComponent;
  });

  it('should set the active class on selected tab', () => {
    spectator.detectChanges();
    expect(host.tab1?.active).toBe(true);
    expect(host.tab2?.active).toBe(false);
    expect(host.tab3?.active).toBe(false);
  });

  it('should update the active class after clicking', () => {
    spectator.click('#settings');
    spectator.detectChanges();
    expect(host.tab1?.active).toBe(false);
    expect(host.tab2?.active).toBe(true);
    expect(host.tab3?.active).toBe(false);
  });
});
