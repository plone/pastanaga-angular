import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { EllipsisTooltipDirective, ExtendedTooltipDirective } from './ellipsis-tooltip.directive';

@NgModule({
    declarations: [TooltipComponent, TooltipDirective, EllipsisTooltipDirective, ExtendedTooltipDirective],
    exports: [TooltipComponent, TooltipDirective, EllipsisTooltipDirective, ExtendedTooltipDirective],
    imports: [CommonModule],
})
export class PaTooltipModule {}
