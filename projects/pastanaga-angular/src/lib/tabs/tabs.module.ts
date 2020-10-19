import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { TabItemComponent } from './tab-item.component';
import { TabsListComponent } from './tabs-list.component';
import { PaIconModule } from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, PaIconModule, A11yModule],
    exports: [TabsListComponent, TabItemComponent],
    declarations: [TabsListComponent, TabItemComponent],
    providers: [],
})
export class PaTabsModule {}
