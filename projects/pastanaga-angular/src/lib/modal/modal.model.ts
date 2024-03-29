import { Observable, Subject } from 'rxjs';
import { Aspect } from '../common';

export interface ConfirmationData {
  title: string;

  cancelAspect?: Aspect;
  cancelLabel?: string;
  confirmLabel?: string;
  description?: string;
  isDestructive?: boolean;
  onlyConfirm?: boolean;
}

export interface IModalConfig<D = any> {
  dismissable?: boolean;
  data?: D;
}

export class ModalConfig<D = any> {
  dismissable: boolean;
  readonly data?: Readonly<D>;

  constructor(config?: IModalConfig<D>) {
    this.dismissable = !!config && typeof config.dismissable === 'boolean' ? config.dismissable : true;
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
