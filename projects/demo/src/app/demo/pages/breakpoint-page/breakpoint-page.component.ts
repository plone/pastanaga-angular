import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    templateUrl: './breakpoint-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreakpointPageComponent {
    viewportSize = `export enum ViewportSize {
    small = 0,
    medium = 600,
    large = 1025,
    xLarge = 1470,
}`;
    currentMinSizeUsage = `ngOnInit(): void {
    this.pastanaga.breakpoint.currentMinSize
        .pipe(takeUntil(this.terminator))
        .subscribe((viewportSize: ViewportSize) => {
            this._isDesktop = viewportSize === ViewportSize.large;
            this._isTablet = viewportSize === ViewportSize.medium;
            if (!this._isDesktop) {
                this.store.dispatch(NavigationActions.hideNavigation());
            } else {
                this.store.dispatch(NavigationActions.showNavigation());
            }
            markForCheck(this.cdr);
        });
}`;
}
