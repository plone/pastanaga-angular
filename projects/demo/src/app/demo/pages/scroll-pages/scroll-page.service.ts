import { Injectable } from '@angular/core';
import { data } from './data_1189';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Data {
  _id: string;
  index: number;
  guid: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
}

export interface Pagination {
  total: number;
  hasMore: boolean;
}

export interface DataPage {
  data: Data[];
  pagination: Pagination;
}

@Injectable({ providedIn: 'root' })
export class ScrollPageService {
  private readonly _batchSize = 25;

  private _loadedData: BehaviorSubject<DataPage> = new BehaviorSubject<DataPage>({
    data: data.slice(0, this._batchSize),
    pagination: { total: data.length, hasMore: true },
  });

  private _loadingMore = false;

  getData(): Observable<DataPage> {
    return this._loadedData.asObservable();
  }

  loadMore(lastIndex: number) {
    if (!this._loadingMore) {
      console.log(`Load more from ${lastIndex}`);
      this._loadingMore = true;
      const backendDelay = 150;
      setTimeout(() => {
        const startIndex = lastIndex + 1;
        const current = this._loadedData.value;
        this._loadedData.next({
          data: current.data.concat(data.slice(startIndex, startIndex + this._batchSize)),
          pagination: { total: data.length, hasMore: startIndex + this._batchSize < data.length },
        });
        this._loadingMore = false;
      }, backendDelay);
    }
  }
}
