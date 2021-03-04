import { Directive, Input } from '@angular/core';
import { AvatarModel } from '../avatar/avatar.model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive()
export class BaseChip {
    @Input() avatar?: AvatarModel;

    @Input() ariaRole = 'listitem';

    @Input() value?: any;

    @Input() set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    private _disabled = false;
}
