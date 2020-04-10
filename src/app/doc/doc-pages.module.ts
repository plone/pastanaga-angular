import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaDocModule } from './doc.module';
import { TranslateDocComponent } from './translate-doc/translate-doc.component';
import { AvatarDocComponent } from './avatar-doc/avatar-doc.component';
import { ButtonDocComponent } from './button-doc/button-doc.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AvatarModule, ButtonModule, ControlsModule } from 'pastanaga-angular';
import { FilteredCheckboxGroupDocComponent } from './filtered-checkbox-group-doc/filtered-checkbox-group-doc.component';

const DOC_PAGES = [
    TranslateDocComponent,
    AvatarDocComponent,
    ButtonDocComponent,
    WelcomePageComponent,
    FilteredCheckboxGroupDocComponent,
];

@NgModule({
    imports: [
        CommonModule,

        AvatarModule,
        ButtonModule,
        ControlsModule,

        PaDocModule,
    ],
    exports: DOC_PAGES,
    declarations: DOC_PAGES,
})
export class PaDocPagesModule {
}

