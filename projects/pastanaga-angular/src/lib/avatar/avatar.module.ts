import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';

@NgModule({
    declarations: [AvatarComponent],
    exports: [AvatarComponent],
    imports: [CommonModule],
})
export class PaAvatarModule {}
