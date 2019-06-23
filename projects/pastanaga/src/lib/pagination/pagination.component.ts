import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'pa-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
    @Input() total = 0;
    @Input() pageSize = 20;
    @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
    page = 1;

    pages: number[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.total && changes.total.currentValue && changes.total.currentValue !== changes.total.previousValue) {
            this.computePages();
        }
    }

    back() {
        this.page -= 1;
        this.goTo.emit(this.page);
    }
    
    next() {
        this.page += 1;
        this.goTo.emit(this.page);
    }

    goToPage(pageNumber: number) {
        this.page = pageNumber;
        this.goTo.emit(pageNumber);
    }

    goToFirst() {
        this.page = 0;
        this.goTo.emit(this.pages[0]);
    }

    goToLast() {
        this.page = Math.ceil(this.total / this.pageSize);
        this.goTo.emit(this.page);
    }

    private computePages() {
        if (!!this.total) {
            const totalPages = Math.ceil(this.total / this.pageSize);
            this.pages = Array.apply(null, {length: totalPages}).map(Number.call, Number).map(p => p + 1); // => [1, 2, ...]
        }
    }
}
