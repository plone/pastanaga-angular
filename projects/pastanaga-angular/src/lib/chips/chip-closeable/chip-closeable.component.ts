import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BaseChip } from '../base-chip';

@Component({
    selector: 'pa-chip-closeable',
    templateUrl: './chip-closeable.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipCloseableComponent extends BaseChip {
    @Input() set noCloseButton(value: boolean) {
        this.canClose = !coerceBooleanProperty(value);
    }

    canClose = true;

    @Output() closed = new EventEmitter();

    close($event: Event) {
        this.closed.emit({ event: $event, value: this.value });
    }
}
