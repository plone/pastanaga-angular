import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-input-icon',
    templateUrl: './input-icon.component.html',
    styleUrls: ['./input-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputIconComponent {
    @Input() iconName?: string;
    @Input() iconTooltip?: string;
    @Input() iconColor: 'primary' | 'secondary' | 'destructive' = 'primary';
    @Input()
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    get disabled() { return this._disabled; }
    _disabled = false;

    @Output() iconClick = new EventEmitter<MouseEvent>();

    onIconClick(event: MouseEvent) {
        this.iconClick.emit(event);
    }
}
