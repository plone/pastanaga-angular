import { NgModule } from '@angular/core';
import { CustomViewHeightDirective } from './custom-view-height.directive';

@NgModule({
    declarations: [CustomViewHeightDirective],
    exports: [CustomViewHeightDirective],
})
export class PaCustomViewHeightModule {}
