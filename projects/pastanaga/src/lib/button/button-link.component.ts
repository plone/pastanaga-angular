import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { ButtonBase } from './button-base';

@Component({
    selector: 'pa-button-link',
    templateUrl: './button-link.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
})
export class ButtonLinkComponent extends ButtonBase implements OnChanges {
    @Input() hasButtonDisplay = false;
    @Output() clickEvent: EventEmitter<any> = new EventEmitter();

    ngOnChanges(changes) {
        this.onChanges(changes);

        if (changes.hasButtonDisplay) {
            this.buttonStyle['o-button-link'] = changes.hasButtonDisplay.currentValue;
        }
    }
}
