import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpandComponent } from './expand.component';
import { ExpandListComponent } from './expand-list.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SvgModule } from '../svg/svg.module';

@Directive({ selector: 'expand-title' })
export class ExpandTitleDirective {}

@Directive({ selector: 'expand-description' })
export class ExpandDescriptionDirective {}

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        SvgModule,
    ],
    exports: [
        ExpandComponent,
        ExpandListComponent,
        ExpandTitleDirective,
        ExpandDescriptionDirective,
    ],
    declarations: [
        ExpandComponent,
        ExpandListComponent,
        ExpandTitleDirective,
        ExpandDescriptionDirective,
    ],
    providers: [],
})
export class ExpandModule { }
