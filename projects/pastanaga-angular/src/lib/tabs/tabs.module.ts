import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabItemComponent } from './tab-item.component';
import { TabsListComponent } from './tabs-list.component';
import { PaIconModule } from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, PaIconModule],
    exports: [TabsListComponent, TabItemComponent],
    declarations: [TabsListComponent, TabItemComponent],
    providers: [],
})
export class PaTabsModule { }
