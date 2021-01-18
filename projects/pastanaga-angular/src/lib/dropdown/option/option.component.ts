import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from '../../popup/popup.service';
import { markForCheck } from '../../common';

@Component({
    selector: 'pa-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements AfterContentInit, OnInit {
    @Input()
    set value(value: string) {
        this._value = value || '';
    }
    get value(): string {
        return this._value;
    }
    @Input()
    set icon(value: string) {
        this._icon = value || '';
    }
    get icon(): string {
        return this._icon;
    }
    @Input()
    set destructive(value: boolean) {
        this._destructive = coerceBooleanProperty(value);
    }
    get destructive(): boolean {
        return this._destructive;
    }
    @Input()
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }
    @Input()
    set selected(value: boolean) {
        this._selected = coerceBooleanProperty(value);
        // when selected is triggered programmatically by a parent component
        // change detection must be triggered manually
        markForCheck(this.cdr);
    }
    get selected(): boolean {
        return this._selected;
    }
    @Input()
    set dontCloseOnSelect(value: boolean) {
        this._dontCloseOnSelect = coerceBooleanProperty(value);
    }
    get dontCloseOnSelect(): boolean {
        return this._dontCloseOnSelect;
    }

    @Output() selectOption: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter<MouseEvent | KeyboardEvent>();

    text = '';
    _hidden = false;

    private _value = '';
    private _icon = '';
    private _disabled = false;
    private _selected = false;
    private _destructive = false;
    private _dontCloseOnSelect = false;

    constructor(private element: ElementRef, private popupService: PopupService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngAfterContentInit() {
        this.text = this.element.nativeElement.textContent.trim();
    }

    onSelect($event: MouseEvent | KeyboardEvent) {
        if (!this._disabled) {
            this.selectOption.emit($event);

            if (!this._dontCloseOnSelect) {
                this.popupService.closeAllPopups.next();
            }
        } else {
            $event.stopPropagation();
            $event.preventDefault();
        }
    }
}
