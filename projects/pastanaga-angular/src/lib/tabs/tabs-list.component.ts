import {
    Component,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ChangeDetectorRef,
    ElementRef,
    OnDestroy,
    Input,
    Renderer2,
} from '@angular/core';
import { TabItemComponent } from './tab-item.component';
import { fromEvent, interval, Subject } from 'rxjs';
import { detectChanges } from '../common';
import { debounce, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-tabs',
    templateUrl: 'tabs-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsListComponent implements AfterContentInit, OnDestroy {
    @Input() set notFullWidth(notFull: boolean) {
        this.fullWidthTabItems = !coerceBooleanProperty(notFull);
        this.updateSlider();
    }

    @ContentChildren(TabItemComponent) tabItems!: QueryList<TabItemComponent>;

    sliderStyle = '';
    fullWidthTabItems = true;

    private _xPosition = 0;
    private _terminator = new Subject();

    constructor(private ref: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

    ngAfterContentInit(): void {
        // wait for tabList to be rendered
        setTimeout(() => {
            this._xPosition = this.ref.nativeElement.getBoundingClientRect().x;
            this.updateSlider();
            this.trackTabSelection();
        });
        this.tabItems.changes.subscribe(() => {
            this.updateSlider();
            this.trackTabSelection();
        });

        fromEvent(window, 'resize')
            .pipe(
                debounce(() => interval(150)),
                takeUntil(this._terminator)
            )
            .subscribe(() => {
                this._xPosition = this.ref.nativeElement.getBoundingClientRect().x;
                this.updateSlider();
            });
    }

    ngOnDestroy() {
        this._terminator.next();
        this._terminator.complete();
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
        if (!!item) {
            // wait for tab item to be rendered
            setTimeout(() => {
                const tabRect = item?.geTabRect();
                this.sliderStyle = `left: ${tabRect.x - this._xPosition}px; width: ${tabRect.width}px`;
                detectChanges(this.cdr);
            });
        }
    }
}
