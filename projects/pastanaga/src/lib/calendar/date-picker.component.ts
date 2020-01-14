import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from '../popup/popup.service';

@Component({
    selector: 'pa-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['../popup/_popup.scss', './date-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent extends PopupComponent {

    @Input() set rangeStart(value) { this._rangeStart = coerceBooleanProperty(value); }
    _rangeStart = false;

    @Input() set rangeEnd(value) { this._rangeEnd = coerceBooleanProperty(value); }
    _rangeEnd = false;

    @Input() min?: Date;
    @Input() selection?: {start?: Date, end?: Date} | Date;

    @Input() set noFuture(value) { this._noFuture = coerceBooleanProperty(value); }
    _noFuture = false;

    @Output() select: EventEmitter<Date | null> = new EventEmitter<Date>();

    constructor(
        public popupService: PopupService,
        public renderer: Renderer2,
        public element: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        super(popupService, renderer, element, cdr);
    }

    onSelection(date: Date | null) {
        if (!this._rangeStart) {
            this.close();
        }
        this.select.emit(date);
    }

    onOutsideClick(event) {
        if (!this.isNodeFromCalendar(event.target)) {
            this.close();
        }
    }

    private isNodeFromCalendar(node: HTMLElement): boolean {
        if (typeof node.className === 'string' && node.className.includes('pa-calendar')) {
            return true;
        } else if (!!node.parentElement) {
            return this.isNodeFromCalendar(node.parentElement);
        } else {
            return false;
        }
    }
}
