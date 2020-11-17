import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-chip',
    templateUrl: './chip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
    @Input() contact?: { name: string; image?: Observable<Blob> };

    @Input() autoBackgroundAvatar = false;

    @Input() set noCloseButton(value: boolean) {
        this.canClose = !coerceBooleanProperty(value);
    }

    canClose = true;

    @Input() disabled = false;

    @Input() ariaRole = 'listitem';

    @Input() value?: any;

    @Output() closed = new EventEmitter();

    close($event: Event) {
        this.closed.emit({ event: $event, value: this.value });
    }
}
