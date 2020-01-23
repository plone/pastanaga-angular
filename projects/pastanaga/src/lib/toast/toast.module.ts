import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ButtonModule } from '../button/button.module';
import { ToastComponent } from './toast.component';
import { SvgModule } from '../svg/svg.module';
import { TranslateModule } from '../translate/translate.module';

@NgModule({
    imports: [CommonModule, TranslateModule, TooltipModule, ButtonModule, SvgModule],
    exports: [ToastComponent],
    declarations: [ToastComponent],
    entryComponents: [ToastComponent],
})
export class ToasterModule { }

