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
    this.sortable = data.sortable || false;
    this.active = data.active || false;
    this.descending = data.descending || false;
    this.centered = data.centered || false;
  }
}

export class SortableHeaderCell extends HeaderCell {
  constructor(data: IHeaderCell) {
    super({ ...data, sortable: true });
  }
}
