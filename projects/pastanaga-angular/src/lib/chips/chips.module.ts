import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { PaAvatarModule } from '../avatar/avatar.module';
import { PaButtonModule } from '../button/button.module';

@NgModule({
    declarations: [ChipComponent],
    imports: [CommonModule, PaAvatarModule, PaButtonModule],
    exports: [ChipComponent],
})
export class PaChipsModule {}
