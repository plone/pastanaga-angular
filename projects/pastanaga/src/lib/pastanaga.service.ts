import { Injectable } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';

@Injectable({ providedIn: 'root' })
export class PastanagaService {

    constructor(public sidebar: SidebarService) {}
}
