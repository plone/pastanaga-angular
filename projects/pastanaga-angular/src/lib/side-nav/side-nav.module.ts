import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { SideNavItemComponent } from './side-nav-item.component';
import { SideNavContentDirective, SideNavFooterDirective, SideNavHeaderDirective } from './side-nav.directive';
import { PaButtonModule } from '../button/button.module';
import { PaFocusableModule } from '../focusable/focusable.module';
import { PaIconModule } from '../icon/icon.module';

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
