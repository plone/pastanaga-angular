import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc.component';
import { AvatarModule, ButtonModule, SidebarModule } from 'pastanaga-angular';
import { TraversalModule } from 'angular-traversal';
import { TranslateDocComponent } from './translate-doc/translate-doc.component';
import { AvatarDocComponent } from './avatar-doc/avatar-doc.component';
import { ButtonDocComponent } from './button-doc/button-doc.component';

@NgModule({
    imports: [
        CommonModule,
        SidebarModule,
        TraversalModule,
        AvatarModule,
        ButtonModule,
    ],
    declarations: [
        DocComponent,
        TranslateDocComponent,
        AvatarDocComponent,
        ButtonDocComponent,
    ],
    exports: [
        DocComponent,
        TranslateDocComponent,
        AvatarDocComponent,
        ButtonDocComponent,
    ]
})
export class DocModule {
}
