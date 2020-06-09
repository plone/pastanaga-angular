import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseControl } from '../../base-control';


@Component({
    selector: 'pa-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends BaseControl implements OnInit, OnDestroy {
    @Input()
    get type(): 'checkbox' | 'radio' { return this._type; }
    set type(value: 'checkbox' | 'radio') {
        if (!!value) {
            this._type = value;
        }
    }

    _fieldType = 'checkbox';
    _type: 'checkbox' | 'radio' = 'checkbox';

    constructor(
        protected cdr: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
