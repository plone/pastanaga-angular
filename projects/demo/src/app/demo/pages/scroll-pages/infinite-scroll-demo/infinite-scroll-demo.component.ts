import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Data, DataPage, ScrollPageService } from '../scroll-page.service';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'pa-demo-infinite-scroll',
  templateUrl: 'infinite-scroll-demo.component.html',
  styleUrls: ['infinite-scroll-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollDemoComponent {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();

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
