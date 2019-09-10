import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { TranslateModule } from '../translate/translate.module';

@NgModule({
    imports: [CommonModule, TranslateModule],
    exports: [TooltipComponent, TooltipDirective],
    declarations: [TooltipComponent, TooltipDirective],
    entryComponents: [TooltipComponent],
})
export class TooltipModule { }
