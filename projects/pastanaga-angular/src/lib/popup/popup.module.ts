import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupDirective } from './popup.directive';
import { PopupComponent } from './popup.component';
import { PopoverComponent } from './popover/popover.component';
import { ExtendedPopupDirective, PopoverDirective } from './popover/popover.directive';

@NgModule({
    imports: [CommonModule],
    exports: [PopupComponent, PopupDirective, PopoverComponent, PopoverDirective, ExtendedPopupDirective],
    declarations: [PopupComponent, PopupDirective, PopoverComponent, PopoverDirective, ExtendedPopupDirective],
})
export class PaPopupModule {}
