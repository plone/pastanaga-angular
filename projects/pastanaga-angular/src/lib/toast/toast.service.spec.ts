import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ToastService } from './toast.service';
import { BehaviorSubject } from 'rxjs';
import { ToastStatus } from './toast.model';
import { ApplicationRef, Component, ComponentRef, Renderer2 } from '@angular/core';
import { ToastComponent } from './toast.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { PaToastModule } from './toast.module';

@Component({
    template: ``,
})
export class TestComponent {
    constructor(private service: ToastService) {}
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
                        imports: [PaToastModule],
                        entryComponents: [ToastComponent],
                    },
                },
            ],
        ],
    });
    let spectator: Spectator<TestComponent>;
    let service: ToastService;
    let appRef: ApplicationRef;
    let toastStatus: BehaviorSubject<ToastStatus>;
    let renderer: Renderer2;
    let toastContainer: HTMLElement | undefined;
    let toastMap: Map<string, ComponentRef<ToastComponent>>;
    beforeEach(() => {
        spectator = createService();
        service = spectator.inject(ToastService);
        appRef = spectator.inject(ApplicationRef);
        // @ts-ignore accessing private member
        toastStatus = service._toastStatus;
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
        const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`);
        expect(createdToast).toBeTruthy();

        expect(attachView).toHaveBeenCalledWith(createdToast?.hostView);
        nextId++;
        // @ts-ignore accessing private member
        toastContainer = service._toastContainer;

        expect(toastContainer).toBeTruthy();

        expect(setAttributes).toHaveBeenCalledWith(createdToast?.location.nativeElement, 'role', 'alert');
        expect(appendChild).toHaveBeenCalledWith(toastContainer, createdToast?.location.nativeElement);

        expect(toastStatus.value).toEqual('opened');
    });

    it('should open a toast with config', () => {
        service.open('a message', 'success', { buttonLabel: 'label' });
        expect(toastMap.size).toEqual(1);
        const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`);
        expect(createdToast).toBeTruthy();
        nextId++;
        // @ts-ignore accessing private member
        expect(createdToast?.instance._actionButtonLabel).toEqual('label');
    });

    it('should open an info toast', () => {
        service.openInfo('info message');
        expect(toastMap.size).toEqual(1);
        const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`);
        expect(createdToast).toBeTruthy();
        nextId++;
        // @ts-ignore accessing private member
        expect(createdToast?.instance._class).toEqual('pa-toast-info');
    });

    it('should open an success toast', () => {
        service.openSuccess('success message');
        expect(toastMap.size).toEqual(1);
        const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`);
        expect(createdToast).toBeTruthy();
        nextId++;
        // @ts-ignore accessing private member
        expect(createdToast?.instance._class).toEqual('pa-toast-success');
    });

    it('should open an warning toast', () => {
        service.openWarning('warning message');
        expect(toastMap.size).toEqual(1);
        const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`);
        expect(createdToast).toBeTruthy();
        nextId++;
        // @ts-ignore accessing private member
        expect(createdToast?.instance._class).toEqual('pa-toast-warning');
    });

    it('should open an error toast', () => {
        service.openError('error message');
        expect(toastMap.size).toEqual(1);
        const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`);
        expect(createdToast).toBeTruthy();
        nextId++;
        // @ts-ignore accessing private member
        expect(createdToast?.instance._class).toEqual('pa-toast-error');
    });

    it('should remove toast and container', () => {
        const detachView = jest.spyOn(appRef, 'detachView');
        const removeChild = jest.spyOn(renderer, 'removeChild');
        service.openInfo('info message');
        expect(toastMap.size).toEqual(1);
        const createdToast: ComponentRef<ToastComponent> | undefined = toastMap.get(`pa-toast-${nextId}`);
        expect(createdToast).toBeTruthy();
        // @ts-ignore accessing private member
        toastContainer = service._toastContainer;

        createdToast?.instance.dismiss.emit(`pa-toast-${nextId}`);
        expect(toastMap.size).toEqual(0);
        expect(detachView).toHaveBeenCalledWith(createdToast?.hostView);
        expect(removeChild).toHaveBeenCalledWith(document.body, toastContainer);

        expect(toastStatus.value).toEqual('closed');
        nextId++;
    });
});
