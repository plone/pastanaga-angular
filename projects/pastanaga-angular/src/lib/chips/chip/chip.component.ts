import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AvatarModel } from '../../avatar/avatar.model';

@Component({
    selector: 'pa-chip',
    templateUrl: './chip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
    @Input() avatar?: AvatarModel;

    @Input() set noCloseButton(value: boolean) {
        this.canClose = !coerceBooleanProperty(value);
    }

    canClose = true;

    @Input() set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    private _disabled = false;

    @Input() ariaRole = 'listitem';

    @Input() value?: any;

    @Output() closed = new EventEmitter();

    close($event: Event) {
        this.closed.emit({ event: $event, value: this.value });
    }
}
