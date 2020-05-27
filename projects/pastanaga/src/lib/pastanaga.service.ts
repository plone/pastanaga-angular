import { Injectable } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';
import { TranslatePipe } from './translate/translate.pipe';
import { PopupService } from './popup/popup.service';
import { CalendarService } from './calendar/calendar.service';
import { Toaster } from './toast/toast.service';
import { DialogService } from './dialog/dialog.service';

@Injectable({ providedIn: 'root' })
export class PastanagaService {

    constructor(
        public calendar: CalendarService,
        public dialog: DialogService,
        public popup: PopupService,
        public sidebar: SidebarService,
        public translate: TranslatePipe,
        public toaster: Toaster,
    ) {}
}
