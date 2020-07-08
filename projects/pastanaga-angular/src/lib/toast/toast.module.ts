import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { PaButtonModule } from '../button/button.module';
import { PaIconModule } from '../icon/icon.module';

@NgModule({
    declarations: [ToastComponent],
    imports: [CommonModule, PaButtonModule, PaIconModule],
})
export class PaToastModule {}
