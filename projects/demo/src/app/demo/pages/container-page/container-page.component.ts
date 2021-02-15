import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'atlas-demo-container-page',
    templateUrl: './container-page.component.html',
    styleUrls: ['./container-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerPageComponent {
    demoVisible = false;

    wideExample = `<div class="pa-main-container-wide">
    <!-- View content -->
</div>`;

    compactExample = `<div class="pa-main-container-tight">
    <div class="pa-child-container-compact">
        <!-- View content -->
    </div>
</div>`;

    panelExample = `<div class="pa-main-container">
    <div class="pa-main-side-panel">
        <!-- Panel content -->
    </div>
    <div class="pa-main-container-wide">
        <!-- View content -->
    </div>
</div>`;
}
