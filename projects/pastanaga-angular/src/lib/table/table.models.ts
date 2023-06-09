import { coerceBooleanProperty } from '@angular/cdk/coercion';

export interface IHeaderCell {
  id: string;
  label: string;
  active?: boolean;
  sortable?: boolean;
  descending?: boolean;
  centered?: boolean;
}

export class HeaderCell {
  id: string;
  label: string;
  sortable: boolean;
  active: boolean;
  descending: boolean;
  centered: boolean;

  constructor(data: IHeaderCell) {
    this.id = data.id;
    this.label = data.label;
    this.sortable = coerceBooleanProperty(data.sortable);
    this.active = coerceBooleanProperty(data.active);
    this.descending = coerceBooleanProperty(data.descending);
    this.centered = coerceBooleanProperty(data.centered);
  }
}

export class SortableHeaderCell extends HeaderCell {
  constructor(data: IHeaderCell) {
    super({ ...data, sortable: true });
  }
}
