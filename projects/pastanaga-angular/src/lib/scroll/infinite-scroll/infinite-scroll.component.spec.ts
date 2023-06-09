import { InfiniteScrollComponent } from './infinite-scroll.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('VirtualScrollComponent', () => {
  const createComponent = createComponentFactory({
    component: InfiniteScrollComponent,
    detectChanges: false,
  });
  let component: InfiniteScrollComponent;
  let spectator: Spectator<InfiniteScrollComponent>;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should have two anchors in the dom', () => {
    expect(spectator.query('[qa="mid-anchor"]')).toBeTruthy();
    expect(spectator.query('[qa="bottom-anchor"]')).toBeTruthy();
  });
});
