import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input()
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }

    @Output() cardClick: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter<MouseEvent | KeyboardEvent>();

    private _disabled = false;

    onEnter($event: Event) {
        this.onClick($event as KeyboardEvent);
    }

    onClick($event: MouseEvent | KeyboardEvent) {
        if (this.disabled) {
            $event.preventDefault();
            $event.stopPropagation();
        } else {
            this.cardClick.emit($event);
        }
    }
}
