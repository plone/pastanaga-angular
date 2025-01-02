import {
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  Output,
} from '@angular/core';

@Component({
  selector: 'pa-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  @Output() reachAnchor = new EventEmitter();

  @ViewChild('mid') mid?: ElementRef<HTMLElement>;
  @ViewChild('bottom') bottom?: ElementRef<HTMLElement>;

  get element() {
    return this.host.nativeElement;
  }

  private _observer?: IntersectionObserver;

  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    const options = {
      root: this.isHostScrollable() ? this.element : null,
    };
    if (!!this.bottom && !!this.mid) {
      this._observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.reachAnchor.emit();
        }
      }, options);
      this._observer.observe(this.mid.nativeElement);
      this._observer.observe(this.bottom.nativeElement);
    }
  }

  ngOnDestroy() {
    this._observer?.disconnect();
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
  }
}
