import { Component } from '@angular/core';
import { ToastConfig, ToastService, ToastType } from '@guillotinaweb/pastanaga-angular';

@Component({
  templateUrl: './toast-page.component.html',
  standalone: false,
})
export class ToastPageComponent {
  code = `constructor(private toaster: ToastService) {}
//…
this.toaster.openInfo(message, config);
this.toaster.openSuccess(message, config);
this.toaster.openWarning(message, config);
this.toaster.openError(message, config);`;

  selectedType: ToastType = 'info';
  hasIcon = false;
  hasTitle = false;
  selectedToastButton: 'none' | 'label' | 'icon' | 'autoClose' = 'none';

  constructor(private toaster: ToastService) {}

  openToast() {
    let config: ToastConfig = {};
    if (this.hasIcon) {
      config.icon = this.getIconByType();
    }
    if (this.hasTitle) {
      config.title = this.selectedType.charAt(0).toUpperCase() + this.selectedType.substring(1);
    }

    const message = `This is a${this.selectedType === 'info' || this.selectedType === 'error' ? 'n' : ''}
         ${this.selectedType} toast${this.hasIcon ? ' with ' + config.icon + ' icon' : '.'}`;

    if (this.selectedToastButton !== 'none') {
      config.button =
        this.selectedToastButton === 'icon'
          ? { icon: 'cross', action: () => {} }
          : {
              label: 'Undo',
              action: () => {
                console.log('Undo was triggered');
              },
            };
    }
    if (this.selectedToastButton === 'autoClose') {
      config.autoClose = true;
    }
    this._openToast(message, config);
  }

  private _openToast(message: string, config: ToastConfig) {
    switch (this.selectedType) {
      case 'info':
        this.toaster.openInfo(message, config);
        break;
      case 'success':
        this.toaster.openSuccess(message, config);
        break;
      case 'warning':
        this.toaster.openWarning(message, config);
        break;
      case 'error':
        this.toaster.openError(message, config);
        break;
    }
  }

  private getIconByType(): string {
    switch (this.selectedType) {
      case 'success':
        return 'checkbox';
      case 'error':
        return 'warning';
      default:
        return this.selectedType;
    }
  }
}
