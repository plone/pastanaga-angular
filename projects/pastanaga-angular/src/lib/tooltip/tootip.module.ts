import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { PaTranslateModule } from '../translate/translate.module';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
    declarations: [TooltipComponent, TooltipDirective],
    exports: [TooltipComponent, TooltipDirective],
    imports: [CommonModule, PaTranslateModule],
})
export class PaTooltipModule {}
