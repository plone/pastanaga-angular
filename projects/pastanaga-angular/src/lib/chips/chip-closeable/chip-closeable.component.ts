import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseChip } from '../base-chip';

@Component({
  selector: 'pa-chip-closeable',
  templateUrl: './chip-closeable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChipCloseableComponent extends BaseChip {
  @Input({ transform: booleanAttribute }) readonly = false;
  @Output() closed = new EventEmitter();

  close($event: Event) {
    this.closed.emit({ event: $event, value: this.value });
  }
}
