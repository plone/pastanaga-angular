import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabItemComponent } from './tab-item.component';
import { TabsListComponent } from './tabs-list.component';
import { PaIconModule } from '../icon';
import { PaFocusableModule } from '../focusable';

@NgModule({
  imports: [CommonModule, PaIconModule, PaFocusableModule],
  exports: [TabsListComponent, TabItemComponent],
  declarations: [TabsListComponent, TabItemComponent],
  providers: [],
})
export class PaTabsModule {}
