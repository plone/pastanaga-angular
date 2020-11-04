import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { SideNavItemComponent } from './side-nav-item.component';
import { SideNavFooterDirective, SideNavHeaderDirective } from './side-nav.directive';
import { PaButtonModule } from '../button/button.module';

@NgModule({
    imports: [CommonModule, PaButtonModule],
    declarations: [SideNavComponent, SideNavItemComponent, SideNavHeaderDirective, SideNavFooterDirective],
    exports: [SideNavComponent, SideNavItemComponent, SideNavHeaderDirective, SideNavFooterDirective],
})
export class PaSideNavModule {}
