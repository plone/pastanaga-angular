import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from '../tooltip/tooltip.module';
import { ButtonModule } from '../button/button.module';
import { PaginationComponent } from './pagination.component';
import { SvgModule } from '../svg/svg.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule,
        SvgModule,
    ],
    exports: [
        PaginationComponent,
    ],
    declarations: [
        PaginationComponent,
    ],
    providers: [],
})
export class PaginationModule { }
