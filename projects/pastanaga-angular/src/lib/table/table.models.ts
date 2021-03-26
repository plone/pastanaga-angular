import { coerceBooleanProperty } from '@angular/cdk/coercion';

export interface IHeaderCell {
    id: string;
    label: string;
    active?: boolean;
    sortable?: boolean;
    descending?: boolean;
}

export class HeaderCell {
    id: string;
    label: string;
    sortable: boolean;
    active: boolean;
    descending: boolean;

    constructor(data: IHeaderCell) {
        this.id = data.id;
        this.label = data.label;
        this.sortable = coerceBooleanProperty(data.sortable);
        this.active = coerceBooleanProperty(data.active);
        this.descending = coerceBooleanProperty(data.descending);
    }
}

export class SortableHeaderCell extends HeaderCell {
    constructor(data: IHeaderCell) {
        super({ ...data, sortable: true });
    }
}
