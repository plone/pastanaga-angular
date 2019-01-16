import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'pa-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss'],
})
export class PastanagaProgressComponent implements OnInit, OnChanges {
    @Input() value?: number;
    @Input() isSecondary = false;
    @Input() isSmall = false;
    @Input() maxValue?: number;

    isIndeterminate = false;
    percentValue = 0;

    ngOnInit() {
        this.setIsIndeterminate();
    }

    ngOnChanges(changes) {
        if (changes.maxValue && changes.maxValue.currentValue === 0) {
            throw new Error('maxValue cannot be 0');
        }

        if (changes.value && typeof changes.value.currentValue !== 'undefined') {
            this.setIsIndeterminate();
            this.calculatePercentValue();
        }
    }

    private setIsIndeterminate() {
        this.isIndeterminate = typeof this.value === 'undefined' || this.value === null;
    }

    private calculatePercentValue() {
        if (typeof this.value === 'number') {
            const max = this.maxValue || 100;
            this.percentValue = this.value * 100 / max;

            if (this.value > max) {
                console.error(`Progress value is greater than the max value: ${this.value} > ${max}!`);
            }
        }
    }
}
