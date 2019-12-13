import { Injectable } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

@Injectable({providedIn: 'root'})
export class SidebarService {
    private registry: {[key: string]: SidebarComponent} = {};

    constructor() {}

    register(key: string, sidebar: SidebarComponent) {
        if (!!this.registry[key]) {
            throw new Error(`Sidebar ${key} already exists. Either unregister it or use an unique key.`);
        }
        this.registry[key] = sidebar;
    }

    unregister(key: string) {
        if (!this.registry[key]) {
            throw new Error(`Sidebar ${key} doesn't exist`);
        }
        delete this.registry[key];
    }

    getSidebar(key: string): SidebarComponent | undefined {
        return this.registry[key];
    }

    toggle(key: string, force?: boolean) {
        const bar = this.getSidebar(key);
        if (!!bar) {
            bar.toggleOpen(force);
        }
    }
}
