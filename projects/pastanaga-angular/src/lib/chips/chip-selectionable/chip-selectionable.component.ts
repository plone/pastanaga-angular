import { BaseChip } from '../base-chip';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pa-chip-selectionable',
    templateUrl: './chip-selectionable.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipSelectionableComponent extends BaseChip {
    @Input() selected?: boolean;

    @Output() select: EventEmitter<void> = new EventEmitter<void>();

    triggerSelect() {
        if (!this.disabled) {
            this.select.emit();
        }
    }
}
