import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { fakeAsync, flush, tick } from '@angular/core/testing';
import { SCROLL_INACTIVE_HIDING_THRESHOLD, ScrollableContainerDirective } from './scrollabe-container.directive';
import { TRANSITION_DURATION } from '../common';

describe('ScrollableContainerDirective', () => {
  let spectator: SpectatorDirective<ScrollableContainerDirective>;
  const createDirective = createDirectiveFactory(ScrollableContainerDirective);

  it('should add pa-scrollable', fakeAsync(() => {
    spectator = createDirective(`<div paScrollableContainer>`);
    spectator.detectChanges();
    flush();
    expect(spectator.element).toHaveClass('pa-scrollable');
  }));

  it('should add pa-scrolling class on scroll then remove it', fakeAsync(() => {
    spectator = createDirective(`<div paScrollableContainer>`);
    spectator.detectChanges();
    flush();
    expect(spectator.element).not.toHaveClass('pa-scrolling');
    spectator.dispatchTouchEvent(spectator.element, 'scroll');
    spectator.dispatchTouchEvent(spectator.element, 'scroll');
    tick(TRANSITION_DURATION.fast);
    expect(spectator.element).toHaveClass('pa-scrolling');
    tick(SCROLL_INACTIVE_HIDING_THRESHOLD);
    expect(spectator.element).not.toHaveClass('pa-scrolling');
  }));
});
