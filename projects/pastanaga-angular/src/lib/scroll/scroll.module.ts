import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { ScrollableContainerDirective } from './scrollabe-container.directive';

@NgModule({
  declarations: [InfiniteScrollComponent, ScrollableContainerDirective],
  exports: [InfiniteScrollComponent, ScrollableContainerDirective],
  imports: [CommonModule],
})
export class PaScrollModule {}
