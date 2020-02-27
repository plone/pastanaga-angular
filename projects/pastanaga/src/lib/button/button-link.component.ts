import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ButtonBase } from './button-base';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-button-link',
    templateUrl: './button-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None // to allow button style to access icon svg
})
export class ButtonLinkComponent extends ButtonBase {
    @Input() route?: string;
    @Input() traverseTo?: string;
    @Input() set hasButtonDisplay(value) {
        this.buttonStyle['pa-button-link'] = !coerceBooleanProperty(value);
    }
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();

    constructor(protected changeDetector: ChangeDetectorRef) {
        super(changeDetector);
        this.buttonStyle['pa-button-link'] = true;
    }
}
