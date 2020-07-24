import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    NgZone,
    Type,
} from '@angular/core';
import { IModal } from './base-modal.component';
import { ModalConfig, ModalRef } from './modal.model';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    hasModalOpened = false;

    private modals: ComponentRef<any>[] = [];
    private counter = 0;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private zone: NgZone
    ) {}

    openModal(component: Type<IModal>, config?: ModalConfig): ModalRef {
        // instantiate modal component
        const modalComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(modalComponentRef.hostView);
        document.body.appendChild(modalComponentRef.location.nativeElement);

        // freeze background
        this.freezeBackground(true);

        // pass config to the modal and manage the component
        const ref = new ModalRef({ id: this.counter, config });
        this.counter++;
        ref.onClose.pipe(take(1)).subscribe(() => this.closeModal(ref));
        if (!modalComponentRef.instance.modal) {
            console.error(`The modal component must be wrapped in a <pa-modal> tag.`);
        } else {
            modalComponentRef.instance.modal.ref = ref;
        }

        // Store the modal and manage the others if any
        if (this.modals.length > 0) {
            this.modals[this.modals.length - 1].instance.modal.ref.isLast = false;
        }
        this.modals.push(modalComponentRef);
        this.hasModalOpened = true;
        return ref;
    }

    private closeModal(ref: ModalRef) {
        const index = this.modals.findIndex((modal) => modal.instance.modal.ref.id === ref.id);
        if (index > -1) {
            this.zone.run(() => {
                const componentRef = this.modals[index];
                document.body.removeChild(componentRef.location.nativeElement);
                componentRef.destroy();
                this.modals.splice(index, 1);
                if (this.modals.length > 0) {
                    this.modals[this.modals.length - 1].instance.modal.ref.isLast = true;
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
