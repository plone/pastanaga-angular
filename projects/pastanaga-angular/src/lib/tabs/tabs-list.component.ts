import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { TabItemComponent } from './tab-item.component';
import { fromEvent, Subject } from 'rxjs';
import { detectChanges } from '../common';
import { takeUntil, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'pa-tabs',
  templateUrl: 'tabs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TabsListComponent implements AfterContentInit, OnDestroy, OnChanges {
  @Input({ transform: booleanAttribute }) noSlider = false;
  @Input({ transform: booleanAttribute }) notFullWidth = false;

  @ContentChildren(TabItemComponent) tabItems!: QueryList<TabItemComponent>;

  sliderStyle = '';

  private _xPosition = 0;
  private _terminator = new Subject<void>();

  constructor(
    private ref: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentInit(): void {
    // wait for tabList to be rendered
    setTimeout(() => {
      this._xPosition = this.ref.nativeElement.getBoundingClientRect().x;
      this.trackTabSelection();
      if (!this.noSlider) {
        this.updateSlider();
      }
    });

    this.tabItems.changes.subscribe(() => {
      this.trackTabSelection();
      if (!this.noSlider) {
        this.updateSlider();
      }
    });

    fromEvent(window, 'resize')
      .pipe(throttleTime(150), takeUntil(this._terminator))
      .subscribe(() => {
        if (!this.noSlider) {
          this._xPosition = this.ref.nativeElement.getBoundingClientRect().x;
          this.updateSlider();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notFullWidth'] && !this.noSlider) {
      this.updateSlider();
    }
  }

  ngOnDestroy() {
    this._terminator.next();
    this._terminator.complete();
  }

  private trackTabSelection() {
    this.tabItems.forEach((tabItem) => {
      tabItem.selected.subscribe(() => {
        if (!this.noSlider) {
          this.updateSlider(tabItem);
        }
      });
    });
  }

  private updateSlider(item?: TabItemComponent) {
    if (!item && !!this.tabItems) {
      item = this.tabItems.find((tabItem) => tabItem.active);
    }
    if (!!item) {
      // wait for tab item to be rendered
      setTimeout(() => {
        const tabRect = item?.getTabRect();
        this.sliderStyle = `left: ${tabRect.x - this._xPosition}px; width: ${tabRect.width}px`;
        detectChanges(this.cdr);
      });
    }
  }
}
