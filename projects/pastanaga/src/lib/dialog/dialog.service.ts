import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    InjectionToken,
    Injector,
    NgZone,
    Type,
} from '@angular/core';
import { DialogConfig, DialogRef } from './dialog.model';
import { IDialog } from './base-dialog.component';
import { BasicConfirmDialogComponent } from './basic-confirm-dialog.component';
import { take } from 'rxjs/operators';

export const PA_DIALOG_DATA = new InjectionToken('Pastanaga Dialog Data');

@Injectable({ providedIn: 'root' })
export class DialogService {
    hasDialogOpened = false;

    private dialogs: ComponentRef<any>[] = [];
    private counter = 0;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private zone: NgZone,
    ) {}

    openDialog<D>(component: Type<IDialog>, config?: DialogConfig<D>): DialogRef {
        // instantiate component
        const injector = Injector.create({
            providers: [
                {
                    provide: PA_DIALOG_DATA,
                    useValue: config?.data,
                },
            ],
            parent: this.injector,
        });
        const dialogComponentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(injector);

        this.appRef.attachView(dialogComponentRef.hostView);
        const domElement = (dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElement);

        // freeze background
        this.freezeBackground(true);

        // pass config and manage the component
        const ref = new DialogRef({ id: this.counter, config });
        this.counter++;
        ref.onClose.pipe(take(1)).subscribe(() => this.closeDialog(ref));
        if (!dialogComponentRef.instance.dialog) {
            console.error('The dialog component must be wrapped in a <pa-dialog> tag.');
        } else {
            dialogComponentRef.instance.dialog.ref = ref;
        }

        if (this.dialogs.length > 0) {
            this.dialogs[this.dialogs.length - 1].instance.dialog.ref.isLast = false;
        }
        this.dialogs.push(dialogComponentRef);
        this.hasDialogOpened = true;

        return ref;
    }

    closeDialog(ref: DialogRef) {
        const index = this.dialogs.findIndex((dialog) => dialog.instance.dialog.ref.id === ref.id);
        if (index >= 0) {
            this.zone.run(() => {
                const ref = this.dialogs[index];
                const domElement = (ref.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
                this.appRef.detachView(ref.hostView);
                document.body.removeChild(domElement);
                ref.destroy();
                this.dialogs.splice(index, 1);
                if (this.dialogs.length > 0) {
                    this.dialogs[this.dialogs.length - 1].instance.dialog.ref.isLast = true;
                }
            });
        }
        if (this.dialogs.length === 0) {
            this.freezeBackground(false);
            this.hasDialogOpened = false;
        }
    }

    openConfirm(title: string, description?: string): DialogRef {
        const dialogRef = this.openDialog(BasicConfirmDialogComponent);
        dialogRef['title'] = title;
        dialogRef['description'] = description;
        return dialogRef;
    }

    setFocusToActiveDialog() {
        this.dialogs[this.dialogs.length - 1].instance.dialog.setFocus();
    }

    private freezeBackground(freeze: boolean) {
        document.body.style.overflow = freeze ? 'hidden' : 'inherit';
    }
}
