import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { PaIconModule } from '../icon/icon.module';


@NgModule({
    declarations: [AvatarComponent],
    exports: [AvatarComponent],
    imports: [
        CommonModule,
        PaIconModule
    ]
})
export class PaAvatarModule {
}
