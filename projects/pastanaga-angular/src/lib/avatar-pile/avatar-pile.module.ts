import { AvatarPileComponent } from '../avatar-pile/avatar-pile.component';
import { PaButtonModule } from '../button/button.module';
import { PaDropdownModule } from '../dropdown/dropdown.module';
import { PaPopupModule } from '../popup/popup.module';
import { PaTranslateModule } from '../translate/translate.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaAvatarModule } from '../avatar/avatar.module';
import { PaTooltipModule } from '../tooltip/tootip.module';

@NgModule({
    imports: [
        CommonModule,
        PaAvatarModule,
        PaButtonModule,
        PaDropdownModule,
        PaPopupModule,
        PaTranslateModule,
        PaTooltipModule,
    ],
    declarations: [AvatarPileComponent],
    exports: [AvatarPileComponent],
})
export class PaAvatarPileModule {}
