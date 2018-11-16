import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { IconComponent } from './icon.component';
import { SvgLoader } from './svg-loader';

@NgModule({
    imports: [CommonModule, HttpClientModule, AngularSvgIconModule],
    exports: [IconComponent],
    declarations: [IconComponent],
    providers: [SvgLoader],
})
export class SvgModule {}
