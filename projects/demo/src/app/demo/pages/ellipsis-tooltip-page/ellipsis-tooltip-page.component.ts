import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'atlas-demo-ellipsis-tooltip-page',
    templateUrl: './ellipsis-tooltip-page.component.html',
    styleUrls: ['./ellipsis-tooltip-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisTooltipPageComponent {
    code = `<div class="example-container">
    <p paEllipsisTooltip>Short text</p>
    <p paEllipsisTooltip>No tooltip</p>
    <p paEllipsisTooltip>Text content long enough to display an ellipsis and a tooltip</p>
</div>`;
}
