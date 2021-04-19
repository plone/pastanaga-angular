import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BaseChip } from '../base-chip';

@Component({
    selector: 'pa-chip-expandable',
    templateUrl: './chip-expandable.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipExpandableComponent extends BaseChip {
    @Output() expanded = new EventEmitter();

    isExpanded = false;

    expand($event: Event) {
        this.isExpanded = !this.isExpanded;
        this.expanded.emit({ event: $event, value: this.value });
    }
}
