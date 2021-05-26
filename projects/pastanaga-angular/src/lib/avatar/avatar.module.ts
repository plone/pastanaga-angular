import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { PaTooltipModule } from '../tooltip/tootip.module';

@NgModule({
    declarations: [AvatarComponent],
    exports: [AvatarComponent],
    imports: [CommonModule, PaTooltipModule],
})
export class PaAvatarModule {}
