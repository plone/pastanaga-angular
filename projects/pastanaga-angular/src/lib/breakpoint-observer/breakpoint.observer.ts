import { Inject, Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, startWith, map } from 'rxjs/operators';
import { WINDOW } from '@ng-web-apis/common';

export enum ViewportSize {
    small = 0,
    medium = 600,
    large = 1024,
    xLarge = 1440,
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

    constructor(
        @Inject(WINDOW) private window: any, // we need `any` so the non-Ivy compilation do not break when building the lib bundle
    ) {
        this.currentMinSize = this.watchViewportSize(this.findMinSize.bind(this));
        this.currentMaxSize = this.watchViewportSize(this.findMaxSize.bind(this));
        this.currentMode = this.currentMinSize.pipe(
            map((viewportSize) => {
                switch (viewportSize) {
                    case ViewportSize.medium:
                        return 'tablet';
                    case ViewportSize.small:
                        return 'mobile';
                    default:
                        return 'desktop';

                }
            }),
        );
    }

    private watchViewportSize(findSize: () => ViewportSize): Observable<ViewportSize> {
        return fromEvent(this.window, 'resize').pipe(
            startWith(findSize()),
            map(() => findSize()),
            distinctUntilChanged(),
            shareReplay(1),
        );
    }

    private findMinSize(): ViewportSize {
        const matchingSizes: ViewportSize[] = ViewportSize.values().filter((size: ViewportSize) => {
            const query = `(min-width: ${size}px)`;
            return this.window.matchMedia(query).matches;
        });
        return matchingSizes[matchingSizes.length - 1] || ViewportSize.small;
    }

    private findMaxSize(): ViewportSize {
        const matchingSizes: ViewportSize[] = ViewportSize.values().filter((size: ViewportSize) => {
            const query = `(max-width: ${size - 1}px)`;
            return this.window.matchMedia(query).matches;
        });
        return matchingSizes[0] || ViewportSize.xLarge;
    }
}
