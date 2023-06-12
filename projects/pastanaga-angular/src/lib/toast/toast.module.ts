import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { PaButtonModule } from '../button';
import { PaIconModule } from '../icon';
import { PaTranslateModule } from '../translate';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, PaButtonModule, PaIconModule, PaTranslateModule],
})
export class PaToastModule {}
