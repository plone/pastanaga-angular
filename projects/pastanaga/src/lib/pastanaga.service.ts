import { Injectable } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';
import { TranslatePipe } from './translate/translate.pipe';
import { PopupService } from './popup/popup.service';
import { CalendarService } from './calendar/calendar.service';

@Injectable({ providedIn: 'root' })
export class PastanagaService {

    constructor(
        public calendar: CalendarService,
        public popup: PopupService,
        public sidebar: SidebarService,
        public translate: TranslatePipe,
    ) {}
}
