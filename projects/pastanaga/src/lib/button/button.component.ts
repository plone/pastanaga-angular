import { Component, OnChanges, ViewEncapsulation } from '@angular/core';
import { ButtonBase } from './button-base';

@Component({
    selector: 'pa-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
})
export class ButtonComponent extends ButtonBase implements OnChanges {
    checkedType = 'button';


    ngOnChanges(changes) {
        this.onChanges(changes);

        if (changes.type && ['button', 'submit', 'reset'].indexOf(changes.type.currentValue) !== -1) {
            this.checkedType = this.type;
        }
    }

    onClick($event) {
        if (this.type !== 'submit') {
            $event.preventDefault();
        }
    }
}
