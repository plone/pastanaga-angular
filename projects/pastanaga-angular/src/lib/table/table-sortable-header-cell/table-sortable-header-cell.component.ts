import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'pa-table-sortable-header-cell',
    templateUrl: './table-sortable-header-cell.component.html',
    styleUrls: ['./table-sortable-header-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableHeaderCellComponent implements OnChanges {
    @Input() active = false;
    @Input() isDescending = false;

    @Output() sort = new EventEmitter();

    icon?: string;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.active || changes.isDescending) {
            this.updateIcon();
        }
    }

    private updateIcon() {
        if (!coerceBooleanProperty(this.active)) {
            this.icon = 'chevron-up';
        } else {
            this.icon = coerceBooleanProperty(this.isDescending) ? 'arrow-up' : 'arrow-down';
        }
    }
}
