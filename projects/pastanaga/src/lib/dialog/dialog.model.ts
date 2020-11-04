import { EventEmitter } from '@angular/core';

export interface DialogConfigData<D = any> {
    bandColor?: string;
    blocking?: boolean;
    withCloseButton?: boolean;
    data?: D;
}

export class DialogConfig<D = any> {
    bandColor: string;
    blocking: boolean;
    withCloseButton: boolean;
    data: D | undefined;

    constructor(data?: DialogConfigData<D>) {
        this.blocking = !!data && typeof data.blocking === 'boolean' ? data.blocking : true;
        this.withCloseButton = !!data && typeof data.withCloseButton === 'boolean' ? data.withCloseButton : true;
        this.bandColor = !!data ? data.bandColor || '' : '';
        this.data = data?.data;
    }
}

export interface DialogRefData {
    id: number;
    config?: DialogConfig;
}

export class DialogRef {
    id: number;
    isLast: boolean;
    config: DialogConfig;
    onClose: EventEmitter<any>;

    constructor(data: DialogRefData) {
        this.id = data.id || 0;
        this.isLast = true;
        this.onClose = new EventEmitter();
        this.config = data.config || new DialogConfig();
    }
}
