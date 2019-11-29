import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-progress-circle',
    templateUrl: './progress-circle.component.html',
    styleUrls: ['./progress-circle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastanagaProgressCircleComponent {
    @Input() isLarge = false;
    @Input() set percent (value: number) {
        this.percentValue = Math.min(Math.ceil(coerceNumberProperty(value)), 100);
    }
    @Input() color: 'primary'|'secondary' = 'primary';

    percentValue = 0;
}
