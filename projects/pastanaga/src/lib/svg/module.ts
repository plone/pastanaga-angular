import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { IconComponent } from './icon.component';

@NgModule({
    imports: [CommonModule, HttpClientModule, AngularSvgIconModule],
    exports: [IconComponent],
    declarations: [IconComponent],
})
export class SvgModule {}
