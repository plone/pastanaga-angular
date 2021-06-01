import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Data, DataPage, ScrollPageService } from './scroll-page.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Component({
    templateUrl: './infinite-scroll-page.component.html',
    styleUrls: ['./infinite-scroll-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollPageComponent {
    private _data: Observable<DataPage> = this.service.getData();
    private _hasMore = false;

    total = this._data.pipe(
        tap((page) => (this._hasMore = page.pagination.hasMore)),
        map((page) => page.pagination.total),
    );
    data = this._data.pipe(map((page) => page.data));

    constructor(private service: ScrollPageService) {}

    loadMore() {
        if (this._hasMore) {
            this.data
                .pipe(
                    map((data) => data[data.length - 1].index),
                    take(1),
                )
                .subscribe((lastIndex) => this.service.loadMore(lastIndex));
        }
    }

    trackById(index: number, card: Data) {
        return card.index;
    }
}
