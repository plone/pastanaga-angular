import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { ButtonComponent } from './button.component';
import { PaIconModule } from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, PaIconModule, A11yModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
})
export class PaButtonModule {}
