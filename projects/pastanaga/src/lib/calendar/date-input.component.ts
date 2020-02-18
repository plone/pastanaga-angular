import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';
import { markForCheck } from '../common/utils';

@Component({
    selector: 'pa-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['../popup/_popup.scss', './date-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent extends PopupComponent {

    dateInput = '';
    dateError = false;
    isValidDate = false;
    currentDate: Date = new Date();
    focused = false;

    @Input() dateHelp: string = '';
    @Input() datePlaceholder: string = 'mm/dd/yyyy';

    @Output() select: EventEmitter<Date | null> = new EventEmitter<Date>();

    constructor(
        public popupService: PopupService,
        public renderer: Renderer2,
        public element: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        super(popupService, renderer, element, cdr);
    }

    selectDate(date: Date) {
        this.currentDate = date;
        this.dateInput = '';
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (today.getFullYear() === date.getFullYear()){
            if (today.getMonth() === date.getMonth() && today.getDate() === date.getDate()){
                this.dateInput = 'Today';
            } else if (yesterday.getMonth() === date.getMonth() && yesterday.getDate() === date.getDate()){
                this.dateInput = 'Yesterday';
            }
        }
        if (this.dateInput === '') {
            this.dateInput = mm + '/' + dd + '/' + yyyy; // American date format
        }
        markForCheck(this.cdr);
        this.select.emit(this.currentDate);
    }

    checkTypedDate(date: string) {
        if (date !== ''){
            this.dateError = false;
            this.isValidDate = true;
            if (date.toLowerCase() === 'today') {
                this.currentDate = new Date();
            } else if (date.toLowerCase() === 'yesterday') {
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                this.currentDate = yesterday;
            } else {
                const typedDate = new Date(date);
                this.isValidDate = date.length >= 8 && typedDate.toString() !== 'Invalid Date';
                if (this.isValidDate) {
                    const brokenDate = date.split('/');
                    if (brokenDate[0] === '2' || brokenDate[0] === '02') {
                        this.isValidDate = this.checkFebruaryDate(brokenDate);
                    }
                }
                this.dateError = !this.isValidDate;
            }
            if (this.isValidDate) {
                this.select.emit(this.currentDate);
            }
        }
    }

    private checkFebruaryDate(brokenDate: string[]) {
        if (Number(brokenDate[1]) <= 28) {
            return true;
        } else if (Number(brokenDate[1]) >= 30) {
            return false;
        } else {
            const year = Number(brokenDate[2]);
            return (year % 4 === 0) && ((year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0));
        }
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
    }
}
