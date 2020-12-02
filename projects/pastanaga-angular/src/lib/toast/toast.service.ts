import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    Renderer2,
    RendererFactory2,
} from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastConfig, ToastStatus, ToastType } from './toast.model';
import { BehaviorSubject, Observable } from 'rxjs';

let nextId = 0;

@Injectable({ providedIn: 'root' })
export class ToastService {
    private _toastStatus = new BehaviorSubject<ToastStatus>('closed');
    private _renderer: Renderer2;
    private _toastContainer?: HTMLElement;
    private _toastMap: Map<string, ComponentRef<ToastComponent>> = new Map();

    get toastStatus(): Observable<ToastStatus> {
        return this._toastStatus.asObservable();
    }

    constructor(
        private resolver: ComponentFactoryResolver,
        private rendererFactory: RendererFactory2,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    openInfo(message: string, config?: ToastConfig) {
        this.open(message, 'info', config);
    }

    openSuccess(message: string, config?: ToastConfig) {
        this.open(message, 'success', config);
    }

    openWarning(message: string, config?: ToastConfig) {
        this.open(message, 'warning', config);
    }

    openError(message: string, config?: ToastConfig) {
        this.open(message, 'error', config);
    }

    open(message: string, type: ToastType, config?: ToastConfig) {
        this._toastStatus.next('opening');
        const id = `pa-toast-${nextId++}`;
        const toast: ComponentRef<ToastComponent> = this.createToast(id, message, type, config);

        this.appRef.attachView(toast.hostView);
        this._toastMap.set(id, toast);

        if (!this._toastContainer) {
            this._toastContainer = this.createContainer();
        }

        this._renderer.setAttribute(toast.location.nativeElement, 'role', 'alert');
        this._renderer.appendChild(this._toastContainer, toast.location.nativeElement);
        this._toastStatus.next('opened');
    }

    private createToast(id: string, message: string, type: ToastType, config?: ToastConfig) {
        const componentFactory = this.resolver.resolveComponentFactory(ToastComponent);

        const componentRef = componentFactory.create(this.injector);
        componentRef.instance.id = id;
        componentRef.instance.message = message;
        componentRef.instance.type = type;
        if (!!config) {
            componentRef.instance.config = config;
        }
        componentRef.instance.dismiss.subscribe((_id: string) => {
            this.removeToast(_id);
        });
        return componentRef;
    }

    private createContainer(): HTMLElement {
        const container = document.createElement('div');
        container.className = 'pa-toast-container';
        this._renderer.appendChild(document.body, container);
        return container;
    }

    private removeToast(id: string) {
        const ref = this._toastMap.get(id);
        if (!ref) {
            return;
        }
        this.appRef.detachView(ref.hostView);
        ref.destroy();
        this._toastMap.delete(id);
        if (!this._toastMap.size) {
            this.removeContainer();
            this._toastStatus.next('closed');
        }
    }

    private removeContainer() {
        this._renderer.removeChild(document.body, this._toastContainer);
        this._toastContainer = undefined;
    }
}
