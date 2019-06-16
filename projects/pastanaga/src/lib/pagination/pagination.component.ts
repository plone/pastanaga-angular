import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'pa-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
    @Input() total = 0;
    @Input() page = 0;
    @Input() pageSize = 20;
    @Output() goTo: EventEmitter<number> = new EventEmitter<number>();

    pages: number[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.total && changes.total.currentValue && changes.total.currentValue !== changes.total.previousValue) {
            this.computePages();
        }
    }

    back() {
        this.goTo.emit(this.page - 1);
    }

    next() {
        this.goTo.emit(this.page + 1);
    }

    goToPage(pageNumber: number) {
        this.goTo.emit(pageNumber);
    }

    goToFirst() {
        this.goTo.emit(this.pages[0]);
    }

    goToLast() {
        this.goTo.emit(this.pages[this.pages.length - 1]);
    }

    private computePages() {
        if (!!this.total) {
            const totalPages = Math.ceil(this.total / this.pageSize);
            this.pages = Array.apply(null, {length: totalPages}).map(Number.call, Number).map(p => p + 1); // => [1, 2, ...]
        }
    }
}
