import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupDirective } from './popup.directive';
import { PopupComponent } from './popup.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        PopupComponent,
        PopupDirective,
    ],
    declarations: [
        PopupComponent,
        PopupDirective,
    ],
})
export class PaPopupModule {}
