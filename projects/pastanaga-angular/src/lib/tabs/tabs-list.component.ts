import {
    Component,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ChangeDetectorRef,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { TabItemComponent } from './tab-item.component';
import { BehaviorSubject, fromEvent, interval, Subject } from 'rxjs';
import { detectChanges } from '../common';
import { debounce, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'pa-tabs',
    templateUrl: 'tabs-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsListComponent implements AfterContentInit, OnDestroy {
    @ContentChildren(TabItemComponent) tabItems!: QueryList<TabItemComponent>;

    selected = new BehaviorSubject(0);
    sliderStyle = '';
    xPosition = 0;
    terminator = new Subject();

    constructor(private ref: ElementRef, private cdr: ChangeDetectorRef) {}

    ngAfterContentInit(): void {
        this.xPosition = this.ref.nativeElement.getBoundingClientRect().x;
        this.updateSlider();
        this.trackTabSelection();

        this.tabItems.changes.subscribe(() => {
            this.updateSlider();
            this.trackTabSelection();
        });

        fromEvent(window, 'resize')
            .pipe(
                debounce(() => interval(150)),
                takeUntil(this.terminator)
            )
            .subscribe(() => {
                this.xPosition = this.ref.nativeElement.getBoundingClientRect().x;
                this.updateSlider();
            });
    }

    ngOnDestroy() {
        this.terminator.next();
        this.terminator.complete();
    }

    trackTabSelection() {
        this.tabItems.forEach((tabItem) => {
            tabItem.selected.subscribe(() => this.updateSlider(tabItem));
        });
    }

    updateSlider(item?: TabItemComponent) {
        if (!item) {
            item = this.tabItems.find((tabItem) => tabItem._active);
        }
        if (item) {
            const tabRect = item.geTabRect();
            this.sliderStyle = `left: ${tabRect.x - this.xPosition}px; width: ${tabRect.width}px`;
            detectChanges(this.cdr);
        }
    }
}
