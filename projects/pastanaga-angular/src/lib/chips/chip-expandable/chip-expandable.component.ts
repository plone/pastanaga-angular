import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BaseChip } from '../base-chip';

@Component({
  selector: 'pa-chip-expandable',
  templateUrl: './chip-expandable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChipExpandableComponent extends BaseChip {
  @Output() expanded: EventEmitter<{ event: Event; value: any }> = new EventEmitter();

  isExpanded = false;

  expand($event: Event) {
    if (!this.disabled) {
      this.isExpanded = !this.isExpanded;
      this.expanded.emit({ event: $event, value: this.value });
    } else {
      $event.stopPropagation();
      $event.preventDefault();
    }
  }
}
