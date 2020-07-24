import { EventEmitter } from '@angular/core';

export interface IModalConfig {
    blocking?: boolean;
    withCloseButton?: boolean;
}

export class ModalConfig {
    blocking: boolean;
    withCloseButton: boolean;

    constructor(data?: IModalConfig) {
        this.blocking = !!data && typeof data.blocking === 'boolean' ? data.blocking : true;
        this.withCloseButton = !!data && typeof data.withCloseButton === 'boolean' ? data.withCloseButton : true;
    }
}

export class ModalRef {
    id: number;
    isLast: boolean;
    config: ModalConfig;
    onClose: EventEmitter<any>;

    constructor(data: { id: number; config?: ModalConfig }) {
        this.id = data.id;
        this.isLast = true;
        this.config = data.config || new ModalConfig();
        this.onClose = new EventEmitter<any>();
    }
}
