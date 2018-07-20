import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ButtonModule } from '../button/button.module';
import { ToastComponent } from './toast.component';
import { Toaster } from './toast.service';
import { SvgModule } from '../svg/svg.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, TranslateModule, TooltipModule, ButtonModule, SvgModule],
    exports: [ToastComponent],
    declarations: [ToastComponent],
    entryComponents: [ToastComponent],
})
export class ToastModule { }

@NgModule({

})
export class ToasterModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ToastModule,
            providers: [Toaster]
        };
    }

    constructor (@Optional() @SkipSelf() parentModule: ToastModule) {
        if (parentModule) {
            throw new Error('ToastModule is already loaded. Import it in the AppModule only');
        }
    }
}
