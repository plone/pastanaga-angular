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
import { Subject } from 'rxjs';

let nextId = 0;

@Injectable({ providedIn: 'root' })
export class ToastService {
    toastStatus = new Subject<ToastStatus>();
    private renderer: Renderer2;
    private toastContainer?: HTMLElement;
    private toastMap: Map<string, ComponentRef<ToastComponent>> = new Map();

    constructor(
        private resolver: ComponentFactoryResolver,
        private rendererFactory: RendererFactory2,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
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
        this.toastStatus.next('opening');
        const id = `pa-toast-${nextId++}`;
        const toast: ComponentRef<ToastComponent> = this.createToast(id, message, type, config);

        this.appRef.attachView(toast.hostView);
        this.toastMap.set(id, toast);

        if (!this.toastContainer) {
            this.toastContainer = this.createContainer();
        }

        this.renderer.setAttribute(toast.location.nativeElement, 'role', 'alert');
        this.renderer.appendChild(this.toastContainer, toast.location.nativeElement);
        this.toastStatus.next('opened');
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
        this.renderer.appendChild(document.body, container);
        return container;
    }

    private removeToast(id: string) {
        const ref = this.toastMap.get(id);
        if (!ref) {
            return;
        }
        this.appRef.detachView(ref.hostView);
        ref.destroy();
        this.toastMap.delete(id);
        if (!this.toastMap.size) {
            this.removeContainer();
            this.toastStatus.next('closed');
        }
    }

    private removeContainer() {
        this.renderer.removeChild(document.body, this.toastContainer);
        this.toastContainer = undefined;
    }
}
