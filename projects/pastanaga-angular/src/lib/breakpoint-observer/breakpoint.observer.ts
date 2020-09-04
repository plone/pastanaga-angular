import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, startWith, map } from 'rxjs/operators';

export enum ViewportSize {
    small = 0,
    medium = 600,
    large = 1025,
    xLarge = 1470,
}

export namespace ViewportSize {
    export function values(): ViewportSize[] {
        return [ViewportSize.small, ViewportSize.medium, ViewportSize.large, ViewportSize.xLarge];
    }
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

@Injectable({ providedIn: 'root' })
export class BreakpointObserver {
    currentMode: Observable<ViewportMode>;
    currentMinSize: Observable<ViewportSize>;
    currentMaxSize: Observable<ViewportSize>;

    constructor() {
        this.currentMinSize = this.watchViewportSize(this.findMinSize);
        this.currentMaxSize = this.watchViewportSize(this.findMaxSize);
        this.currentMode = this.currentMinSize.pipe(
            map((viewportSize) =>
                viewportSize === ViewportSize.small
                    ? 'mobile'
                    : viewportSize === ViewportSize.medium
                    ? 'tablet'
                    : 'desktop'
            )
        );
    }

    private watchViewportSize(findSize: () => ViewportSize): Observable<ViewportSize> {
        return fromEvent(window, 'resize').pipe(
            startWith(findSize()),
            map(() => findSize()),
            distinctUntilChanged(),
            shareReplay(1)
        );
    }

    private findMinSize(): ViewportSize {
        const matchingSizes: ViewportSize[] = ViewportSize.values().filter((size: ViewportSize) => {
            const query = `(min-width: ${size}px)`;
            return window.matchMedia(query).matches;
        });
        return matchingSizes[matchingSizes.length - 1] || ViewportSize.small;
    }

    private findMaxSize(): ViewportSize {
        const matchingSizes: ViewportSize[] = ViewportSize.values().filter((size: ViewportSize) => {
            const query = `(max-width: ${size - 1}px)`;
            return window.matchMedia(query).matches;
        });
        return matchingSizes[0] || ViewportSize.xLarge;
    }
}
