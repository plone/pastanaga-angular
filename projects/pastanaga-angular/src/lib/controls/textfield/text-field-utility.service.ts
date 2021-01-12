import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { take, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TextFieldUtilityService {
    constructor(private platform: Platform, private ngZone: NgZone, private autofillMonitor: AutofillMonitor) {}

    public handleBrowserAutoFill(htmlElement: HTMLInputElement, control: FormControl, stopMonitoring: Subject<any>) {
        if (this.platform.isBrowser && !!htmlElement) {
            this.autofillMonitor
                .monitor(htmlElement)
                .pipe(takeUntil(stopMonitoring))
                .subscribe((event) => {
                    if (htmlElement.value && event.isAutofilled) {
                        control.markAsDirty();
                        control.patchValue(htmlElement.value);
                    }
                });
            stopMonitoring.pipe(take(1)).subscribe(() => {
                this.autofillMonitor.stopMonitoring(htmlElement);
            });
        }
    }

    public handleIosCaretPosition(htmlElement: HTMLInputElement) {
        if (this.platform.IOS && !!htmlElement) {
            this.ngZone.runOutsideAngular(() => {
                htmlElement.addEventListener('keyup', (event: Event) => {
                    const element = event.target as HTMLInputElement;
                    if (!element.value && !element.selectionStart && !element.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        element.setSelectionRange(1, 1);
                        element.setSelectionRange(0, 0);
                    }
                });
            });
        }
    }
}
