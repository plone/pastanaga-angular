import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandComponent } from './expand.component';
import { PaButtonModule } from '../button/button.module';
import { PaTranslateModule } from '../translate/translate.module';
import { ExpandBodyDirective, ExpandHeaderDirective, ExpandHeaderSideBlockDirective } from './expand.directive';

const COMPONENTS = [ExpandComponent, ExpandHeaderDirective, ExpandBodyDirective, ExpandHeaderSideBlockDirective];

@NgModule({
    imports: [CommonModule, PaButtonModule, PaTranslateModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class PaExpandModule {}
