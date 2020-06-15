import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from '../../popup/popup.service';

let nextId = 0;

@Component({
    selector: 'pa-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements OnInit {
    @Input() id?: string;
    @Input()
    set glyph(value: string) { this._glyph = value || ''; }
    get glyph(): string { return this._glyph; }
    @Input()
    set destructive(value: boolean) { this._destructive = coerceBooleanProperty(value); }
    get destructive(): boolean { return this._destructive; }
    @Input()
    set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }
    get disabled(): boolean { return this._disabled; }
    @Input()
    set dontCloseOnSelect(value: boolean) { this._dontCloseOnSelect = coerceBooleanProperty(value); }
    get dontCloseOnSelect(): boolean { return this._dontCloseOnSelect; }

    @Output() select: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter<MouseEvent | KeyboardEvent>();

    _id = '';
    _glyph = '';
    _disabled = false;
    _destructive = false;
    _dontCloseOnSelect = false;

    constructor(
        private popupService: PopupService,
    ) {
    }

    ngOnInit(): void {
        this._id = !this.id ? `menu-item-${nextId++}` : `${this.id}-menu-item`;
    }

    onSelect($event: MouseEvent | KeyboardEvent) {
        if (!this._disabled) {
            this.select.emit($event);

            if (!this._dontCloseOnSelect) {
                this.popupService.closeAllPopups.next();
            }
        } else {
            $event.stopPropagation();
            $event.preventDefault();
        }
    }
}
