import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'pa-progress-circle',
    templateUrl: './progress-circle.component.html',
    styleUrls: ['./progress-circle.component.scss'],
})
export class PastanagaProgressCircleComponent implements OnChanges{
    @Input() isLarge = false;
    @Input() value?: number;
    @Input() color: 'primary'|'secondary' = 'primary';

    percentValue = 0;

    ngOnChanges(changes) {
        if (changes.value && typeof changes.value.currentValue !== 'undefined') {
            this.calculatePercentValue();
        }
    }

    private calculatePercentValue() {
        if (typeof this.value === 'number') {
            const max = 100;
            this.percentValue = this.value * 100 / max;

            if (this.value > max) {
                console.error(`Progress value is greater than the max value: ${this.value} > ${max}!`);
            }
        }
    }
}
