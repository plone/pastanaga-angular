import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc.component';
import { AvatarModule, ButtonModule, SidebarModule } from 'pastanaga-angular';
import { TraversalModule } from 'angular-traversal';
import { TranslateDocComponent } from './translate-doc/translate-doc.component';
import { AvatarDocComponent } from './avatar-doc/avatar-doc.component';
import { ButtonDocComponent } from './button-doc/button-doc.component';
import { DocPageComponent } from './doc-page.component';
import {
    DocPageCodeDirective,
    DocPageDescriptionDirective,
    DocPageExamplesDirective,
    DocPageTitleDirective,
    DocPageUsageDirective
} from './doc-page.directives';

const COMPONENTS = [
    DocComponent,
    DocPageComponent,
    DocPageTitleDirective,
    DocPageDescriptionDirective,
    DocPageExamplesDirective,
    DocPageUsageDirective,
    DocPageCodeDirective,
    TranslateDocComponent,
    AvatarDocComponent,
    ButtonDocComponent,
];

@NgModule({
    imports: [
        CommonModule,
        SidebarModule,
        TraversalModule,
        AvatarModule,
        ButtonModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class DocModule {
}
