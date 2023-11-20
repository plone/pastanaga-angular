import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  createEnvironmentInjector,
  Injectable,
  NgZone,
  Type,
} from '@angular/core';
import { ConfirmationData, ModalConfig, ModalRef } from './modal.model';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

let counter = 0;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  hasModalOpened = false;

  modals: ComponentRef<any>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private zone: NgZone,
  ) {}

  openConfirm(data: ConfirmationData): ModalRef {
    return this.openModal(ConfirmationDialogComponent, new ModalConfig<ConfirmationData>({ data }));
  }

  openModal(component: Type<any>, config?: ModalConfig): ModalRef {
    // create the modal reference
    const ref = new ModalRef({ id: counter++, config });
    ref.onDismiss.subscribe(() => this.closeModal(ref));

    // instantiate injector
    const injector = createEnvironmentInjector(
      [
        {
          provide: ModalRef,
          useValue: ref,
        },
      ],
      this.appRef.injector,
    );

    // instantiate modal component
    const modalComponentRef = createComponent(component, { environmentInjector: injector });
    this.appRef.attachView(modalComponentRef.hostView);
    document.body.appendChild(modalComponentRef.location.nativeElement);

    if (modalComponentRef.instance?.refresh) {
      modalComponentRef.instance.refresh();
    }

    // freeze background
    this.freezeBackground(true);

    // Store the modal and manage the others if any
    if (this.modals.length > 0) {
      this.getModalInstance(this.modals[this.modals.length - 1]).isLast = false;
    }
    this.modals.push(modalComponentRef);
    this.hasModalOpened = true;
    return ref;
  }

  private closeModal(ref: ModalRef) {
    const index = this.modals.findIndex((modal) => this.getModalInstance(modal).id === ref.id);
    if (index > -1) {
      this.zone.run(() => {
        const componentRef = this.modals[index];
        document.body.removeChild(componentRef.location.nativeElement);
        componentRef.destroy();
        this.modals.splice(index, 1);
        if (this.modals.length > 0) {
          this.getModalInstance(this.modals[this.modals.length - 1]).isLast = true;
        }
      });
    }
    if (this.modals.length === 0) {
      this.freezeBackground(false);
      this.hasModalOpened = false;
    }
  }

  private getModalInstance(componentRef: ComponentRef<any>): ModalRef {
    return !!componentRef.instance.modal ? componentRef.instance.modal : componentRef.instance;
  }

  private freezeBackground(freeze: boolean) {
    document.body.style.overflow = freeze ? 'hidden' : 'inherit';
  }
}
