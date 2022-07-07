import { AvatarPileComponent } from './avatar-pile.component';
import { PaAvatarModule } from '../avatar';
import { PaButtonModule } from '../button';
import { PaDropdownModule } from '../dropdown';
import { PaPopupModule } from '../popup';
import { PaTooltipModule } from '../tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        PaAvatarModule,
        PaButtonModule,
        PaDropdownModule,
        PaPopupModule,
        PaTooltipModule,
    ],
    declarations: [AvatarPileComponent],
    exports: [AvatarPileComponent],
})
export class PaAvatarPileModule {}
