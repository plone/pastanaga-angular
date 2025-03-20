import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocPageComponent } from './doc-page.component';
import {
  DocDescriptionDirective,
  DocTitleDirective,
} from './doc-page.directives';
import { DocCodeComponent } from './doc-code.component';

@NgModule({
  declarations: [
    DocPageComponent,
    DocTitleDirective,
    DocDescriptionDirective,
    DocCodeComponent,
  ],
  imports: [CommonModule],
  exports: [
    DocPageComponent,
    DocTitleDirective,
    DocDescriptionDirective,
    DocCodeComponent,
  ],
})
export class DocPageModule {}
