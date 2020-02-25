import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { markForCheck } from '../common/utils';
import { TextfieldCommon } from '../textfield/textfield.common';
import { format, isValid, isToday, isYesterday, getMonth, startOfYesterday } from 'date-fns';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['../popup/_popup.scss', './date-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent extends TextfieldCommon implements OnInit {
    @Input() datePlaceholder = 'mm/dd/yyyy';
    @Input() errorMessage = 'Invalid date (mm/dd/yyyy)';
    @Input() id = '';
    @Input() minDate?: Date;
    @Input() selection?: Date;

    @Input() set noFuture(value) { this._noFuture = coerceBooleanProperty(value); }
    _noFuture = false;
    @Input() set accent(value) { this._accent = coerceBooleanProperty(value); }
    _accent = false;
    @Input() set isLessen(value) { this._isLessen = coerceBooleanProperty(value); }
    _isLessen = false;

    @Output() select: EventEmitter<Date | null> = new EventEmitter<Date>();

    @ViewChild('datePickerPopup', { static: false }) datePicker;

    dateInput = '';
    isValidDate = true;
    currentDate = new Date();

    constructor(
        public cdr: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        if (!!this.selection) {
            this.selectDate(this.selection);
        }
    }

    selectDate(date: Date) {
        this.currentDate = date;
        this.isValidDate = true;
        this.dateInput = isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MM/dd/yyyy');
        markForCheck(this.cdr);
        this.select.emit(this.currentDate);
    }

    checkTypedDate(date: string) {
        if (date !== '') {
            const typedDate = new Date(date);
            this.isValidDate = true;
            if (date.toLowerCase() === 'today') {
                this.currentDate = new Date();
            } else if (date.toLowerCase() === 'yesterday') {
                this.currentDate = startOfYesterday();
            } else {
                this.isValidDate = date.length >= 8 && isValid(typedDate);
                if (this.isValidDate) {
                    const brokenDate = date.split('/');
                    if (brokenDate[0] === '2' || brokenDate[0] === '02') {
                        // If the date is 29 of february of non leap year or 30-31, month will be 2
                        this.isValidDate = getMonth(typedDate) === 1;
                    }
                }
                if (this.isValidDate) {
                    this.currentDate = typedDate;
                }
            }
            if (this.isValidDate) {
                this.select.emit(this.currentDate);
            }
        } else {
            this.select.emit(undefined);
        }
    }

    iconClick($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.datePicker.remoteClick({ignoreRemote: true});
    }
}
