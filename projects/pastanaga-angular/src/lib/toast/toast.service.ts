import { ApplicationRef, ComponentRef, createComponent, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastConfig, ToastType } from './toast.model';
import { Keys } from '../common';

let nextId = 0;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _renderer: Renderer2;
  private _toastContainer?: HTMLElement;
  private _toastMap: Map<
    string,
    {
      component: ComponentRef<ToastComponent>;
      unListeners: (() => void)[];
    }
  > = new Map();

  get toastContainer(): HTMLElement {
    if (!this._toastContainer) {
      this._toastContainer = this.createContainer();
    }
    return this._toastContainer;
  }

  get renderer(): Renderer2 {
    return this._renderer;
  }

  constructor(private rendererFactory: RendererFactory2, private appRef: ApplicationRef) {
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

  open(message: string, type: ToastType, config?: ToastConfig): ComponentRef<ToastComponent> {
    const id = `pa-toast-${nextId++}`;
    const toast: ComponentRef<ToastComponent> = this.createToast(id, message, type, config);
    const toastRefs = {
      component: toast,
      unListeners: [
        this._renderer.listen(document, 'keyup', (event: KeyboardEvent) => {
          if (event.key === Keys.esc) {
            this.removeToast(id);
          }
        }),
      ],
    };

    this.appRef.attachView(toast.hostView);
    this._toastMap.set(id, toastRefs);

    this._renderer.setAttribute(toast.location.nativeElement, 'role', 'alert');
    this._renderer.appendChild(this.toastContainer, toast.location.nativeElement);

    return toast;
  }

  private createToast(id: string, message: string, type: ToastType, config?: ToastConfig) {
    const componentRef = createComponent(ToastComponent, { environmentInjector: this.appRef.injector });
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
    ref.unListeners.forEach((unListen) => unListen());
    this.appRef.detachView(ref.component.hostView);
    ref.component.destroy();
    this._toastMap.delete(id);
    if (!this._toastMap.size) {
      this.removeContainer();
    }
  }

  private removeContainer() {
    this._renderer.removeChild(document.body, this._toastContainer);
    this._toastContainer = undefined;
  }
}
