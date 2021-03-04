import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipCloseableComponent } from './chip-closeable/chip-closeable.component';
import { PaAvatarModule } from '../avatar/avatar.module';
import { PaButtonModule } from '../button/button.module';

@NgModule({
    declarations: [ChipCloseableComponent],
    imports: [CommonModule, PaAvatarModule, PaButtonModule],
    exports: [ChipCloseableComponent],
})
export class PaChipsModule {}
