import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ButtonBase } from './button-base';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-button-link',
    templateUrl: './button-link.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
})
export class ButtonLinkComponent extends ButtonBase {
    @Input() route?: string;
    @Input() traverseTo?: string;
    @Input() set hasButtonDisplay(value) {
        this._hasButtonDisplay = coerceBooleanProperty(value);
    }
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();
    _hasButtonDisplay = false;

    constructor(protected changeDetector: ChangeDetectorRef) {
        super(changeDetector);
    }
}
