import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Self,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { BaseControl } from '../../base-control';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges } from '../../../common';
import { NgControl, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'pa-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends BaseControl implements OnInit, OnDestroy {
    @Input() set type(value: 'checkbox' | 'radio') {
        this._type = value;
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property.
        if (!!this.htmlElement) {
            this.htmlElement.type = value;
        }
    }

    get type(): 'checkbox' | 'radio' {
        return this._type;
    }

    @Input() required?: boolean;

    @ViewChild('htmlElement') htmlElementRef?: ElementRef;

    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter();

    _type: 'checkbox' | 'radio' = 'checkbox';
    isChecked = false;

    requiredValidator?: ValidatorFn;

    constructor(@Optional() @Self() public parentControl: NgControl, protected cdr: ChangeDetectorRef) {
        super(parentControl, cdr);
        this._fieldKind = this._type;
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    toggleCheckbox() {
        if (this._type === 'radio' && !this.model) {
            this.isChecked = true;
            this.onChange(true);
        } else if (this._type === 'checkbox' || !this.model) {
            this.isChecked = !this.isChecked;
            //When managed by formControl/ngModel, onChange will not be triggered.
            this.onChange(this.isChecked);
        }
    }

    preValueChange = (value: any) => {
        return value;
    };

    postValueChange = () => {
        detectChanges(this.cdr);
        this.selectedChange.emit(this.isChecked);
    };

    preWriteValue = (value: any) => {
        return value;
    };

    postWriteValue = () => {
        this.isChecked = coerceBooleanProperty(this.model);
    };

    listInternalValidators = (): ValidatorFn[] => {
        return [];
    };

    registerOnValueChange = (value: any) => {
        return [];
    };

    registerOnStatusChanges = (status: any) => {
        return [];
    };

    shouldUpdateValidators = (changes: SimpleChanges) => {
        return false;
    };
}
