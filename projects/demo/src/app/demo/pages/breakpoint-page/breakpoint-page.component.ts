import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './breakpoint-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BreakpointPageComponent {
  viewportSize = `export enum ViewportSize {
    small = 0,
    medium = 600,
    large = 1024,
    xLarge = 1440,
}`;

  currentMode = `ngOnInit(): void {
    this.breakpoint.currentMode.pipe(takeUntil(this.terminator)).subscribe((mode) => {
        this._mode = mode;
        if (this._mode !== 'desktop') {
            this.store.dispatch(NavigationActions.hideNavigation());
        } else {
            this.store.dispatch(NavigationActions.showNavigation());
        }
        markForCheck(this.cdr);
    });
}`;
}
