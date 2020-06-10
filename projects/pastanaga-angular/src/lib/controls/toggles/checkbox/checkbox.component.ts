import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { BaseControl } from '../../base-control';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { markForCheck } from '../../../common';


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
    @Input()
    get selected(): boolean { return this._selected; }
    set selected(value: boolean) { this._selected = coerceBooleanProperty(value); }

    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter();

    _fieldType = 'checkbox';
    _type: 'checkbox' | 'radio' = 'checkbox';
    _selected = false;

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

    toggleCheckbox() {
        // radio can't be unchecked by clicking on itself
        if (this._type === 'checkbox' || !this._selected) {
            this._selected = !this._selected;
        }
        markForCheck(this.cdr);
        this.selectedChange.emit(this._selected);
    }
}
