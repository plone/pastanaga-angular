import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { SideNavItemComponent } from './side-nav-item/side-nav-item.component';
import { SideNavContentDirective, SideNavFooterDirective, SideNavHeaderDirective } from './side-nav.directive';
import { PaButtonModule } from '../button';
import { PaFocusableModule } from '../focusable';
import { PaIconModule } from '../icon';

@NgModule({
  imports: [CommonModule, PaButtonModule, PaFocusableModule, PaIconModule],
  declarations: [
    SideNavComponent,
    SideNavItemComponent,
    SideNavHeaderDirective,
    SideNavFooterDirective,
    SideNavContentDirective,
  ],
  exports: [
    SideNavComponent,
    SideNavItemComponent,
    SideNavHeaderDirective,
    SideNavFooterDirective,
    SideNavContentDirective,
  ],
})
export class PaSideNavModule {}
