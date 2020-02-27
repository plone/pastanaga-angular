import { Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ButtonBase } from './button-base';

let nextId = 0;

@Component({
    selector: 'pa-button',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
})
export class ButtonComponent extends ButtonBase implements OnInit {
    @Input() id?: string;

    constructor(protected changeDetector: ChangeDetectorRef) {
        super(changeDetector);
    }

    ngOnInit() {
        this.id = !this.id ? `button-${nextId++}` : `${this.id}-button`;
    }

    onClick($event) {
        if (!!$event && this.type !== 'submit') {
            $event.preventDefault();
        }
    }
}
