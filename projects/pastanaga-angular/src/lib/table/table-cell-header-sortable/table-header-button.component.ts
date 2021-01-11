import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'pa-table-header-button',
    templateUrl: './table-header-button.component.html',
    styleUrls: ['./table-header-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderButtonComponent {
    @Input() icon?: string;
    @Input() label?: string;
    @Input() active = true;
}
