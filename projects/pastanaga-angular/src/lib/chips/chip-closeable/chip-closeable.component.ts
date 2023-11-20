import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BaseChip } from '../base-chip';

@Component({
  selector: 'pa-chip-closeable',
  templateUrl: './chip-closeable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipCloseableComponent extends BaseChip {
  @Output() closed = new EventEmitter();

  close($event: Event) {
    this.closed.emit({ event: $event, value: this.value });
  }
}
