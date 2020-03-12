import { EventEmitter } from '@angular/core';

export interface DialogConfigData {
    bandColor?: string;
    blocking?: boolean;
    withCloseButton?: boolean;
}

export class DialogConfig {
    bandColor: string;
    blocking: boolean;
    withCloseButton: boolean;

    constructor(data?: DialogConfigData) {
        this.blocking = !!data && typeof data.blocking === 'boolean' ? data.blocking : true;
        this.withCloseButton = !!data && typeof data.withCloseButton === 'boolean' ? data.withCloseButton : true;
        this.bandColor = !!data ? (data.bandColor || '') : '';
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
