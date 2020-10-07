import { Injectable } from '@angular/core';
import { DateTimeService } from './datetime/datetime.service';
import { PopupService } from './popup/popup.service';
import { TranslatePipe } from './translate/translate.pipe';
import { ModalService } from './modal/modal.service';
import { ToastService } from './toast/toast.service';
import { BreakpointObserver } from './breakpoint-observer/breakpoint.observer';

@Injectable({
    providedIn: 'root',
})
export class PastanagaService {
    constructor(
        public popupService: PopupService,
        public translate: TranslatePipe,
        public datetime: DateTimeService,
        public modalService: ModalService,
        public toastService: ToastService,
        public breakpoint: BreakpointObserver
    ) {}
}
