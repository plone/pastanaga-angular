import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
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

    hasEllipsisTemplate = `<h2 #titleContainer
    [class]="titleClass"
    paEllipsisTooltip
    (hasEllipsis)="hasEllipsis = $event">{{mainTitle}}</h2>`;

    hasEllipsisTs = `@Input()
set toolbarLoaded(flag: boolean) {
    this._toolbarLoaded = coerceBooleanProperty(flag);
    if (flag) {
        this.updateToolbarWidth();
    }
}

@ViewChild('titleContainer', { read: EllipsisTooltipDirective }) titleContainer?: EllipsisTooltipDirective;

hasEllipsis = false;
get titleClass() {
    return this.hasEllipsis ? 'title-l' : 'display-s';
}

updateToolbarWidth() {
    //…
    this.titleContainer?.updateEllipsisTooltip();
}`;
}
