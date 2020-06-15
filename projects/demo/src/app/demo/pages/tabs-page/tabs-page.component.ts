import { Component } from '@angular/core';

@Component({
    templateUrl: 'tabs-page.component.html',
})
export class TabsPageComponent {
    selectedTab = 'info';

    codeExample = `
<pa-tabs>
    <pa-tab (activate)="selectedTab = 'info'"
            [active]="selectedTab === 'info'">Info</pa-tab>
    <pa-tab (activate)="selectedTab = 'settings'"
            [active]="selectedTab === 'settings'">Settings</pa-tab>
    <pa-tab (activate)="selectedTab = 'notifications'"
            [active]="selectedTab === 'notifications'">Notifications</pa-tab>
</pa-tabs>
<section id="panel-info"
         *ngIf="selectedTab === 'info'">
    Some information
</section>
<section id="panel-settings"
         *ngIf="selectedTab === 'settings'">
    Some settings
</section>
<section id="panel-notifications"
         *ngIf="selectedTab === 'notifications'">
    Some notifications
</section>`;
}
