import { Observable, Subject } from 'rxjs';

export interface IModalConfig<D = any> {
    blocking?: boolean;
    showOverlay?: boolean;
    withCloseButton?: boolean;
    data?: D;
}

export class ModalConfig<D = any> {
    blocking: boolean;
    showOverlay: boolean;
    withCloseButton: boolean;
    readonly data?: Readonly<D>;

    constructor(config?: IModalConfig<D>) {
        this.blocking = !!config && typeof config.blocking === 'boolean' ? config.blocking : true;
        this.showOverlay = !!config && typeof config.showOverlay === 'boolean' ? config.showOverlay : true;
        this.withCloseButton = !!config && typeof config.withCloseButton === 'boolean' ? config.withCloseButton : false;
        this.data = config?.data;
    }
}

export class ModalRef<D = any, R = any> {
    private _onClose: Subject<R | undefined>;

    id: number;
    isLast: boolean;
    config: ModalConfig<D>;

    constructor(data: { id: number; config?: ModalConfig<D> }) {
        this.id = data.id;
        this.isLast = true;
        this.config = data.config || new ModalConfig();
        this._onClose = new Subject();
    }

    get onClose(): Observable<R | undefined> {
        return this._onClose.asObservable();
    }

    close(result?: R) {
        this._onClose.next(result);
        this._onClose.complete();
    }
}
