import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../translate/translate.module';
import { RichtextComponent } from '../richtext/richtext.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
    ],
    declarations: [RichtextComponent],
    exports: [RichtextComponent],
})
export class RichtextModule {}
