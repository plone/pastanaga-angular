import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'pa-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class PastanagaSpinnerComponent implements OnChanges {
    @Input() backgroundColor: string;
    @Input() loadingMessage: string;

    backgroundStyle: { [key: string]: string };

    ngOnChanges(changes) {
        if (changes.backgroundColor && changes.backgroundColor.currentValue) {
            this.backgroundStyle = {'background-color': this.backgroundColor};
        }
    }
}
