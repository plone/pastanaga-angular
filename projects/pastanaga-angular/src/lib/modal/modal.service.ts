import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    NgZone,
    Type,
} from '@angular/core';
import { ModalConfig, ModalRef } from './modal.model';

let counter = 0;

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    hasModalOpened = false;

    modals: ComponentRef<any>[] = [];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private zone: NgZone
    ) {}

    openModal(component: Type<any>, config?: ModalConfig): ModalRef {
        // create the modal reference
        const ref = new ModalRef({ id: counter++, config });
        ref.onClose.subscribe(() => this.closeModal(ref));

        // instantiate component
        const injector = Injector.create({
            providers: [
                {
                    provide: ModalRef,
                    useValue: ref,
                },
            ],
            parent: this.injector,
        });

        // instantiate modal component
        const modalComponentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(injector);
        this.appRef.attachView(modalComponentRef.hostView);
        document.body.appendChild(modalComponentRef.location.nativeElement);

        // freeze background
        this.freezeBackground(true);

        // Store the modal and manage the others if any
        if (this.modals.length > 0) {
            this.modals[this.modals.length - 1].instance.modal.isLast = false;
        }
        this.modals.push(modalComponentRef);
        this.hasModalOpened = true;
        return ref;
    }

    private closeModal(ref: ModalRef) {
        const index = this.modals.findIndex((modal) => modal.instance.modal.id === ref.id);
        if (index > -1) {
            this.zone.run(() => {
                const componentRef = this.modals[index];
                document.body.removeChild(componentRef.location.nativeElement);
                componentRef.destroy();
                this.modals.splice(index, 1);
                if (this.modals.length > 0) {
                    this.modals[this.modals.length - 1].instance.modal.isLast = true;
                }
            });
        }
        if (this.modals.length === 0) {
            this.freezeBackground(false);
            this.hasModalOpened = false;
        }
    }

    private freezeBackground(freeze: boolean) {
        document.body.style.overflow = freeze ? 'hidden' : 'inherit';
    }
}
