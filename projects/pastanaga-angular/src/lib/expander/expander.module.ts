import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaButtonModule } from '../button';
import { PaTranslateModule } from '../translate';
import { ExpanderBodyDirective, ExpanderHeaderDirective, ExpanderHeaderSideBlockDirective } from './expander.directive';
import { ExpanderComponent } from './expander.component';

const COMPONENTS = [
  ExpanderComponent,
  ExpanderHeaderDirective,
  ExpanderBodyDirective,
  ExpanderHeaderSideBlockDirective,
];

@NgModule({
  imports: [CommonModule, PaButtonModule, PaTranslateModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class PaExpanderModule {}
