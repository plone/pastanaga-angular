import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef, ComponentFactory} from '@angular/core';
import {ToastComponent} from './toast.component';
import {ToastModel, ToastButtonModel} from './toast.model';

/**
 *   -----------------------
 *   How to use Toaster:
 *   -----------------------
 *
 *   // --------------------- //
 *   // Global configuration. //
 *   // --------------------- //
 *
 *   // We need to define the toast holder for our application.
 *   @ViewChild('onnaToastsBlock', { read: ViewContainerRef }) toastsContainer: ViewContainerRef;
 *
 *   // Import the Toaster in the component that will hold our toast messages.
 *   constructor(private toaster: Toaster){}
 *
 *   // And register the toast container in Toaster.
 *   this.toaster.registerContainer(this.toastsContainer);
 *
 *   // Now, every toast will be injected into our 'onnaToastsBlock'.
 *
 *
 *
 *   // ------------------------ //
 *   // Display a toast message. //
 *   // ------------------------ //
 *
 *   // Displaying a message is very simple (it will be auto-dismissible and cannot be closed by the user)
 *   this.toaster.open('Quick toast');
 *
 *   // If we want to make it closeable (it will display a X button to dismiss it and it will be also auto-dismissible)
 *   this.toaster.open('Quick toast with Close button', true);
 *
 *   // We can specify a particular text for the dismiss button (also auto-dismissible)
 *   this.toaster.open('Quick toast with "Dismiss" button', 'Dismiss');
 *
 *   // To force a manual dismiss we need to set a delay of 0
 *   this.toaster.open('Quick toast with "Dismiss" button', 'Dismiss', 0);
 *
 *   // We can also set a custom delay for our toast (either with or without buttons)
 *   this.toaster.open('Quick toast with long delay', 20000);            // 20s. delay || No button
 *   this.toaster.open('Quick toast with long delay', true, 20000);      // 20s. delay || 'X' button
 *   this.toaster.open('Quick toast with long delay', 'Dismiss', 20000); // 20s. delay || 'Dismiss' button
 *
 *
 *   // --------------------- //
 *   // Customize your toast. //
 *   // --------------------- //
 *
 *   // ----------------------------------------------------------------------------------
 *   // We can create custom buttons to dismiss or handle user interactions with our toast
 *
 *   const confirmButton: ToastButtonModel = new ToastButtonModel({text: 'Confirm'}); // Primary color by default.
 *   const dismissButton: ToastButtonModel = new ToastButtonModel({text: 'Dismiss', color: ToastButtonModel.PRIMARY});
 *   const undoButton: ToastButtonModel = new ToastButtonModel({text: 'Undo', color: ToastButtonModel.SECONDARY});
 *   const destroyButton: ToastButtonModel = new ToastButtonModel({text: 'Destroy', color: ToastButtonModel.DESTRUCTIVE});
 *
 *
 *   const t1 = new ToastModel({message: 'Auto-dismissible toast'});
 *   const t2 = new ToastModel({message: 'A toast with a dismiss button', buttons: [dismissButton]}); // Manual dismiss
 *   const t3 = new ToastModel({message: 'With a manual close button but auto-dismissible anyways', closeable: true});
 *   const t4 = new ToastModel({message: 'I\'m auto-dismissible... but it will take me longer', delay: 10000});
 *
 *   const t5 = new ToastModel({message: 'Auto-dismissible with custom buttons',
 *                             buttons: [confirmButton],
 *                             delay: 5000});
 *
 *   const t6 = new ToastModel({ message: 'A toast with two buttons', buttons: [undoButton, destroyButton]});
 *
 *   // -------------------------------------------------------------------------------------------
 *   // You can add links (anchors) to the message if you follow this markup "[link-text|link-url]"
 *
 *   const t7 = new ToastModel({ message: 'A toast with a [Google|https://www.google.es] link'});
 *
 *
 *   // ---------------------------------------------------------------
 *   // To create any of these toast just pass the ToastModel instance to the Toaster.open() function.
 *
 *   this.toaster.open(t1);
 *   this.toaster.open(t2);
 *   this.toaster.open(t3);
 *
 *
 *   // -------------------------------------------------------------------
 *   // You can also handle user interactions with your customized buttons.
 *
 *   t2.onClick.subscribe(button => {
 *      if (button === dismissButton.text) {
 *          // Handle your dismiss button here.
 *      }
 *   });
 *
 *   t6.onClick.subscribe(button => {
 *      if (button === undoButton.text) {
 *          // Handle UNDO operation here.
 *      } else if (button === destroyButton.text) {
 *          // Handle DESTROY operation here.
 *      }
 *   });
 */
@Injectable({
    providedIn: 'root'
})
export class Toaster {

    private entryPoint?: ViewContainerRef;
    private toasts?: ComponentRef<ToastComponent>[];

    private toastCounter = 0;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        this.toasts = [];
    }

    registerContainer(entryPoint: ViewContainerRef) {
        this.entryPoint = entryPoint;
    }

    /**
     * Displays a new toast.
     *
     * @param toast
     *     Can either be an ToastModel object describing the entire toast or just a message to be displayed.
     *
     * @param button | closeable | delay
     *     If a string is provided, a dismiss button will be displayed with that text.
     *     If a boolean is provided the toast will auto-dismiss based on that value.
     *     If a number is provided, the toast will dismiss itself after that amount of milliseconds.
     *
     * @param closeable | delay
     *     If a boolean is provided the toast will auto-dismiss based on that value.
     *     If a number is provided, the toast will dismiss itself after that amount of milliseconds.
     *
     * @param delay
     *     If a number is provided, the toast will dismiss itself after that amount of milliseconds.
     *
     *     An auto-dismissible toast with 5 seconds delay and no buttons will be display otherwise.
     */
    open(toast: ToastModel | string, button?: string | boolean | number, closeable?: boolean | number, delay?: number) {

        if (toast instanceof ToastModel) {
            this.createToast(toast);
        } else {
            this.openQuickToast(toast, button, closeable, delay);
        }

    }

    private openQuickToast(message: string, button?: string | boolean | number, closeable?: boolean | number, delay?: number) {
        const buttonText = this.isString(button) ? button : '';
        const closeableValue = this.isBoolean(button) ? button : this.isBoolean(closeable) ? closeable : false;
        const delayValue = this.isNumber(button) ? button : this.isNumber(closeable) ? closeable : this.isNumber(delay) ? delay : 5000;

        const quickToast = new ToastModel({message: message, delay: delayValue});
        if (buttonText) {
            const quickButton = new ToastButtonModel({text: buttonText});
            quickToast.buttons = [quickButton];
        } else if (closeableValue) {
            // Fixme: Use the tooltip version when fixed
            // const cancelButton = new ToastButtonModel({icon: 'clear', color: 'secondary', tooltip: 'Close'});
            const cancelButton = new ToastButtonModel({icon: 'clear', color: 'secondary'});
            quickToast.buttons = [cancelButton];
        }

        this.createToast(quickToast);
    }

    private isString(value: any) {
        return typeof value === 'string';
    }

    private isBoolean(value: any) {
        return typeof value === 'boolean';
    }

    private isNumber(value: any) {
        return typeof value === 'number';
    }

    dismiss(toast: ToastModel, button?: string) {
        const index = this.getToastIndex(toast.key);
        if (index < 0) {
            // Return if the toast was already dismissed.
            return;
        }

        if (!!this.toasts) {
            const toastComponentRef = this.toasts[index];

            this.toasts.splice(index, 1);
            this.toasts.forEach((message, i) => message.instance.isSibling = i > 0);
            toastComponentRef.instance.isDismissed = true;
            setTimeout(() => toastComponentRef.destroy(), 500);
        }

        if (!!button && toast.onClick) {
            toast.onClick.next(button);
        }
    }

    private getToastIndex(key: string): number {
        let index = -1;
        if (!!this.toasts) {
            for (let i = 0; i < this.toasts.length; i++) {
                const toast = this.toasts[i];
                if (toast.instance && toast.instance.toast && toast.instance.toast.key === key) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    private createToast(toast: ToastModel) {
        toast.key = 'toast' + this.toastCounter++;
        const componentFactory: ComponentFactory<ToastComponent> = toast.componentFactory ? toast.componentFactory :
        this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
        if (!!this.entryPoint && !!this.toasts) {
            const toastComponentRef: ComponentRef<ToastComponent> = this.entryPoint.createComponent(componentFactory, 0);
            (<ToastComponent>toastComponentRef.instance).toast = toast;
            (<ToastComponent>toastComponentRef.instance).isSibling = this.toasts.length > 0;
            (<ToastComponent>toastComponentRef.instance).dismiss.subscribe(
                toastToDismiss => this.dismiss(toastToDismiss.toast, toastToDismiss.button)
            );

            this.toasts.push(toastComponentRef);
        }
    }
}
