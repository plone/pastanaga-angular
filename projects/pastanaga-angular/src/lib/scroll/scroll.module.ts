import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

@NgModule({
    declarations: [InfiniteScrollComponent],
    exports: [InfiniteScrollComponent],
    imports: [CommonModule],
})
export class PaScrollModule {}
