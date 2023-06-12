import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './infinite-scroll-page.component.html',
  styleUrls: ['./infinite-scroll-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollPageComponent {
  code = `<pa-infinite-scroll (reachAnchor)="loadMore()">
    <pa-demo-data-card *ngFor="let card of (data | async); trackBy: trackById"
                       [data]="card"></pa-demo-data-card>
</pa-infinite-scroll>`;

  demoVisible = false;
}
