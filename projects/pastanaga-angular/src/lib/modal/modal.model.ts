import { Observable, Subject } from 'rxjs';

export interface ConfirmationData {
    title: string;
    description?: string;
    isDestructive?: boolean;
    cancelLabel?: string;
    confirmLabel?: string;
}

export interface IModalConfig<D = any> {
    blocking?: boolean;
    fullscreen?: boolean;
    showOverlay?: boolean;
    closeOnEsc?: boolean;
    data?: D;
}

export class ModalConfig<D = any> {
    blocking: boolean;
    fullscreen: boolean;
    showOverlay: boolean;
    closeOnEsc: boolean;
    readonly data?: Readonly<D>;

    constructor(config?: IModalConfig<D>) {
        this.blocking = !!config && typeof config.blocking === 'boolean' ? config.blocking : true;
        this.showOverlay = !!config && typeof config.showOverlay === 'boolean' ? config.showOverlay : true;
        this.closeOnEsc = !!config && typeof config.closeOnEsc === 'boolean' ? config.closeOnEsc : false;
        this.fullscreen = !!config && typeof config.fullscreen === 'boolean' ? config.fullscreen : false;
        this.data = config?.data;
    }
}

export class ModalRef<D = any, R = any> {
    private _onClose: Subject<R | undefined>;
    private _onDismiss: Subject<R | undefined>;

    id: number;
    isLast: boolean;
    config: ModalConfig<D>;

    constructor(data: { id: number; config?: ModalConfig<D> }) {
        this.id = data.id;
        this.isLast = true;
        this.config = data.config || new ModalConfig();
        this._onClose = new Subject();
        this._onDismiss = new Subject();
    }

    get onClose(): Observable<R | undefined> {
        return this._onClose.asObservable();
    }
    get onDismiss(): Observable<R | undefined> {
        return this._onDismiss.asObservable();
    }

    close(result?: R) {
        this._onClose.next(result);
        this._onClose.complete();
    }

    dismiss(result?: R) {
        this._onDismiss.next(result);
        this._onDismiss.complete();
    }
}
