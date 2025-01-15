import {
  AfterViewInit,
  booleanAttribute,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@Directive({
  selector: '[paEllipsisTooltip]',
  standalone: false,
})
export class ExtendedTooltipDirective extends TooltipDirective {}

@Directive({
  selector: '[paEllipsisTooltip]',
  standalone: false,
})
export class EllipsisTooltipDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() paEllipsisContent?: string;
  @Input({ transform: booleanAttribute }) noEllipsis?: string;

  @Output() hasEllipsis: EventEmitter<boolean> = new EventEmitter();

  private _hasEllipsis = false;

  resizeObserver: ResizeObserver = new ResizeObserver(() => this.updateEllipsisTooltip());

  constructor(
    @Host() public tooltipDirective: ExtendedTooltipDirective,
    private element: ElementRef,
  ) {}

  ngAfterViewInit() {
    if (!this.noEllipsis) {
      this.element.nativeElement.style.setProperty('overflow', 'hidden');
      this.element.nativeElement.style.setProperty('text-overflow', 'ellipsis');
      this.element.nativeElement.style.setProperty('white-space', 'nowrap');
      if (this.element.nativeElement.offsetWidth === 0) {
        this.resizeObserver.observe(this.element.nativeElement);
      } else {
        this.updateEllipsisTooltip();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.noEllipsis) {
      const currentValue = changes['paEllipsisContent']?.currentValue;
      if (!!currentValue && !changes['paEllipsisContent'].firstChange) {
        setTimeout(() => {
          const previousValue = changes['paEllipsisContent']?.previousValue;
          this.updateEllipsisTooltip(!!previousValue && currentValue !== previousValue);
        }, 0);
      }
    }
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }

  updateEllipsisTooltip(textChanged = false) {
    const hasEllipsis = this.element.nativeElement.offsetWidth < this.element.nativeElement.scrollWidth;
    if (!this._hasEllipsis) {
      this._hasEllipsis = hasEllipsis;

      if (this._hasEllipsis) {
        this.tooltipDirective.type = 'system';
        this.tooltipDirective.text = this.element.nativeElement.innerText;
      }
      this.hasEllipsis.emit(this._hasEllipsis);
    } else {
      if (this.element.nativeElement.offsetWidth > 0 && !hasEllipsis) {
        this._hasEllipsis = hasEllipsis;
        this.hasEllipsis.emit(this._hasEllipsis);
      }
      if (textChanged) {
        this.tooltipDirective.text = this.element.nativeElement.innerText;
      }
    }
  }
}
