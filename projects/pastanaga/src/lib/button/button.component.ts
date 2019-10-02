import { Component, Input, OnChanges, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ButtonBase } from './button-base';

let nextId = 0;

@Component({
    selector: 'pa-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
})
export class ButtonComponent extends ButtonBase implements OnInit, OnChanges {
    @Input() id?: string;
    @Input() active = false;
    checkedType = 'button';

    ngOnInit() {
        this.id = !this.id ? `button-${nextId++}` : `${this.id}-button`;
    }

    ngOnChanges(changes) {
        this.onChanges(changes);

        if (changes.type && ['button', 'submit', 'reset'].indexOf(changes.type.currentValue) !== -1) {
            this.checkedType = this.type;
        }
    }

    onClick($event) {
        if (!!$event && this.type !== 'submit') {
            $event.preventDefault();
        }
    }
}
