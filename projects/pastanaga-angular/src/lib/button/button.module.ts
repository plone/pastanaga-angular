import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { PaIconModule } from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, PaIconModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
})
export class PaButtonModule {}
