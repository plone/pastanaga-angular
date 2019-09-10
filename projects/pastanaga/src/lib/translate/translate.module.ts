import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { TranslateDirective } from './translate.directive';

@NgModule({
    imports: [CommonModule],
    exports: [TranslatePipe, TranslateDirective],
    declarations: [TranslatePipe, TranslateDirective],
    providers: [TranslatePipe]
})
export class TranslateModule { }