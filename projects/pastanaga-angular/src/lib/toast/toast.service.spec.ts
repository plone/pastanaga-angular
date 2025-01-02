import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ToastService } from './toast.service';
import { ApplicationRef, Component, ComponentRef, Renderer2 } from '@angular/core';
import { ToastComponent } from './toast.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { PaToastModule } from './toast.module';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { PA_LANG, PA_TRANSLATIONS, PaTranslateModule, TranslatePipe } from '../translate';
import { SvgIconRegistryService } from 'angular-svg-icon';

@Component({
  template: ``,
  standalone: false,
})
export class TestComponent {
  constructor() {}
}

describe('ToastService', () => {
  let nextId = 0;
  const createService = createComponentFactory({
    component: TestComponent,
    overrideModules: [
      [
        BrowserDynamicTestingModule,
        {
          set: {
            imports: [PaToastModule, MockModule(PaTranslateModule)],
            declarations: [MockPipe(TranslatePipe, (value) => `translate--${value}`)],
          },
        },
      ],
    ],
    providers: [
      MockProvider(SvgIconRegistryService),
      { provide: PA_LANG, useValue: 'en_US' },
      {
        provide: PA_TRANSLATIONS,
        useFactory: () => ({}),
      },
    ],
  });
  let spectator: Spectator<TestComponent>;
  let service: ToastService;
  let appRef: ApplicationRef;
  let renderer: Renderer2;
  let toastContainer: HTMLElement | undefined;
  let toastMap: Map<
    string,
    {
      component: ComponentRef<ToastComponent>;
      unListeners: (() => void)[];
    }
  >;
  beforeEach(() => {
    spectator = createService();
    service = spectator.inject(ToastService);
    appRef = spectator.inject(ApplicationRef);
    // @ts-ignore accessing private member
    renderer = service._renderer;
    // @ts-ignore accessing private member
    toastMap = service._toastMap;
  });

  afterEach(() => {
    // @ts-ignore accessing private member
    service._toastMap.clear();
  });

  it('should open a toast without config', () => {
    const attachView = jest.spyOn(appRef, 'attachView');
    const setAttributes = jest.spyOn(renderer, 'setAttribute');
    const appendChild = jest.spyOn(renderer, 'appendChild');
    service.open('a message', 'success');

    expect(toastMap.size).toEqual(1);
    const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`)?.component;
    expect(createdToast).toBeTruthy();

    expect(attachView).toHaveBeenCalledWith(createdToast?.hostView);
    nextId++;
    // @ts-ignore accessing private member
    toastContainer = service._toastContainer;

    expect(toastContainer).toBeTruthy();

    expect(setAttributes).toHaveBeenCalledWith(createdToast?.location.nativeElement, 'role', 'alert');
    expect(appendChild).toHaveBeenCalledWith(toastContainer, createdToast?.location.nativeElement);
  });

  it('should open a toast with config', () => {
    service.open('a message', 'warning', { icon: 'warning' });
    expect(toastMap.size).toEqual(1);
    const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`)?.component;
    expect(createdToast).toBeTruthy();
    nextId++;
    expect(createdToast?.instance.config.icon).toEqual('warning');
  });

  it('should open an info toast', () => {
    service.openInfo('info message');
    expect(toastMap.size).toEqual(1);
    const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`)?.component;
    expect(createdToast).toBeTruthy();
    nextId++;
    expect(createdToast?.instance.toastClass).toEqual('pa-toast-info');
  });

  it('should open an success toast', () => {
    service.openSuccess('success message');
    expect(toastMap.size).toEqual(1);
    const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`)?.component;
    expect(createdToast).toBeTruthy();
    nextId++;
    expect(createdToast?.instance.toastClass).toEqual('pa-toast-success');
  });

  it('should open an warning toast', () => {
    service.openWarning('warning message');
    expect(toastMap.size).toEqual(1);
    const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`)?.component;
    expect(createdToast).toBeTruthy();
    nextId++;
    expect(createdToast?.instance.toastClass).toEqual('pa-toast-warning');
  });

  it('should open an error toast', () => {
    service.openError('error message');
    expect(toastMap.size).toEqual(1);
    const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`)?.component;
    expect(createdToast).toBeTruthy();
    nextId++;
    expect(createdToast?.instance.toastClass).toEqual('pa-toast-error');
  });

  it('should remove toast and container', () => {
    const detachView = jest.spyOn(appRef, 'detachView');
    const removeChild = jest.spyOn(renderer, 'removeChild');
    service.openInfo('info message');
    expect(toastMap.size).toEqual(1);
    const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`)?.component;
    expect(createdToast).toBeTruthy();
    // @ts-ignore accessing private member
    toastContainer = service._toastContainer;

    createdToast?.instance.dismiss.emit(`pa-toast-${nextId}`);
    expect(toastMap.size).toEqual(0);
    expect(detachView).toHaveBeenCalledWith(createdToast?.hostView);
    expect(removeChild).toHaveBeenCalledWith(document.body, toastContainer);
    nextId++;
  });

  it('should close toast by pressing escape', () => {
    const detachView = jest.spyOn(appRef, 'detachView');
    const removeChild = jest.spyOn(renderer, 'removeChild');
    service.openInfo('info message', { autoClose: false });
    expect(toastMap.size).toEqual(1);
    const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`)?.component;
    expect(createdToast).toBeTruthy();
    // @ts-ignore accessing private member
    toastContainer = service._toastContainer;

    spectator.dispatchKeyboardEvent(document.body, 'keyup', 'Escape');
    expect(toastMap.size).toEqual(0);
    expect(detachView).toHaveBeenCalledWith(createdToast?.hostView);
    expect(removeChild).toHaveBeenCalledWith(document.body, toastContainer);
    nextId++;
  });
});
