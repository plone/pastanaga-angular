import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, AngularSvgIconModule, HttpClientModule],
    declarations: [IconComponent],
    exports: [IconComponent],
})
export class PaIconModule {}
