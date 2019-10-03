import { Component, Input, OnChanges } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class PastanagaSpinnerComponent implements OnChanges {
    @Input() backgroundColor?: string;
    @Input() loadingMessage?: string;
    @Input()
    get small(): boolean { return this._small; }
    set small(value: boolean) { this._small = coerceBooleanProperty(value); }
    protected _small = false;

    @Input() color: 'primary'|'secondary' = 'primary';

    backgroundStyle?: { [key: string]: string };

    ngOnChanges(changes) {
        if (changes.backgroundColor && changes.backgroundColor.currentValue) {
            this.backgroundStyle = {'background-color': changes.backgroundColor.currentValue};
        }
    }
}
