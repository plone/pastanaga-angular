import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'pa-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class PastanagaSpinnerComponent implements OnChanges {
    @Input() backgroundColor?: string;
    @Input() loadingMessage?: string;
    @Input() isSmall = false;
    @Input() color: 'primary'|'secondary' = 'primary';

    backgroundStyle?: { [key: string]: string };

    ngOnChanges(changes) {
        if (changes.backgroundColor && changes.backgroundColor.currentValue) {
            this.backgroundStyle = {'background-color': changes.backgroundColor.currentValue};
        }
    }
}
