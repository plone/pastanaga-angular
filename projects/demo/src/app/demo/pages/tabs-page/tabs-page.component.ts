import { Component } from '@angular/core';

@Component({
    templateUrl: 'tabs-page.component.html',
})
export class TabsPageComponent {
    selectedTab = 'info';

    codeExample = `
<ul class="o-tabs-list"
    role="tablist">
    <li class="o-tabs-item"
        role="presentation"
        [class.active]="selectedTab === 'info'">
        <button (click)="selectedTab = 'info'"
                class="o-tabs-link"
                role="tab"
                id="tab-info"
                aria-controls="panel-info"
                [attr.aria-expanded]="selectedTab === 'Info'"
                tabindex="0">
            <div class="o-tabs-link-wrapper"
                    tabindex="-1">Info</div>
        </button>
    </li>
    <li class="o-tabs-item"
        role="presentation"
        [class.active]="selectedTab === 'settings'">
        <button (click)="selectedTab = 'settings'"
                class="o-tabs-link"
                role="tab"
                id="tab-settings"
                aria-controls="panel-settings"
                [attr.aria-expanded]="selectedTab === 'settings'"
                tabindex="0">
            <div class="o-tabs-link-wrapper"
                    tabindex="-1">Settings</div>
        </button>
    </li>
    <li class="o-tabs-item"
        role="presentation"
        [class.active]="selectedTab === 'notifications'">
        <button (click)="selectedTab = 'notifications'"
                class="o-tabs-link"
                role="tab"
                id="tab-notifications"
                aria-controls="panel-notifications"
                [attr.aria-expanded]="selectedTab === 'notifications'"
                tabindex="0">
            <div class="o-tabs-link-wrapper"
                    tabindex="-1">Notifications</div>
        </button>
    </li>
    <div class="o-tabs-slider"
            role="presentation"></div>
</ul>`;
}
