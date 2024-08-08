import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, AngularSvgIconModule],
  declarations: [IconComponent],
  exports: [IconComponent],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class PaIconModule {}
