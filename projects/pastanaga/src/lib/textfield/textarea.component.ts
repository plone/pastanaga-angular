import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextfieldCommon } from './textfield.common';

@Component({
    selector: 'pa-textarea',
    templateUrl: 'textarea.component.html',
    styleUrls: ['textfield.scss', 'textarea.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextareaComponent),
        multi: true,
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => TextareaComponent),
        multi: true,
    }],
})
export class TextareaComponent extends TextfieldCommon {
    baseId = 'textarea';
}
