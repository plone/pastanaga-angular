import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocPageComponent } from './doc-page.component';
import {
    DocPageCodeDirective,
    DocPageDescriptionDirective,
    DocPageExamplesDirective,
    DocPageTitleDirective,
    DocPageUsageDirective
} from './doc-page.directives';
import { DocMenuComponent } from './doc-menu.component';
import { SidebarModule } from 'pastanaga-angular';
import { TraversalModule } from 'angular-traversal';

const COMPONENTS = [
    DocMenuComponent,
    DocPageComponent,
    DocPageTitleDirective,
    DocPageDescriptionDirective,
    DocPageExamplesDirective,
    DocPageUsageDirective,
    DocPageCodeDirective,
];

@NgModule({
    imports: [
        CommonModule,

        SidebarModule,
        TraversalModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaDocModule {
}
