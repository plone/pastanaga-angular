import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../../../pastanaga-angular/src/lib/toast/toast.service';

@Component({
    templateUrl: './toast-page.component.html',
})
export class ToastPageComponent implements OnInit {

    importCode = `imports: [
    PaToastModule,
]`;

    code = `this.toaster.openInfo('This is the default toast.');

this.toaster.openWarning('This is a warning message.');

this.toaster.openSuccess('This is a success message.');

this.toaster.openError('This is an error message.');

this.toaster.openInfo('An info message with icon', {icon: 'warning'});

this.toaster.openInfo('An info message with button', {
            buttonLabel: 'undo',
            action: () => {
                console.log('Undo was triggered');
            }
        });
`;

    constructor(private toaster: ToastService) {
    }

    ngOnInit(): void {
    }

    openInfo() {
        this.toaster.openInfo('This is the default toast.');
    }

    openWarn() {
        this.toaster.openWarning('This is a warning message.');
    }

    openSuccess() {
        this.toaster.openSuccess('This is a success message.');
    }

    openError() {
        this.toaster.openError('This is an error message.');
    }

    openIconToast() {
        this.toaster.openInfo('An info message with icon', {icon: 'warning'});
    }

    openButtonToast() {
        this.toaster.openInfo('An info message with button', {
            buttonLabel: 'undo',
            action: () => {
                console.log('Undo was triggered');
            }
        });
    }
}