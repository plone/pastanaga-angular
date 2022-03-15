import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@Directive({
    selector: '[paEllipsisTooltip]',
})
export class ExtendedTooltipDirective extends TooltipDirective {}

@Directive({
    selector: '[paEllipsisTooltip]',
})
export class EllipsisTooltipDirective implements AfterViewInit, OnChanges {
    @Input() content?: string;

    @Output() hasEllipsis: EventEmitter<boolean> = new EventEmitter();

    constructor(@Host() public tooltipDirective: ExtendedTooltipDirective, private element: ElementRef) {}

    ngAfterViewInit() {
        this.element.nativeElement.style.setProperty('overflow', 'hidden');
        this.element.nativeElement.style.setProperty('text-overflow', 'ellipsis');
        this.element.nativeElement.style.setProperty('white-space', 'nowrap');
        this.updateEllipsisTooltip();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['content']?.currentValue && !changes['content'].firstChange) {
            setTimeout(() => this.updateEllipsisTooltip(), 0);
        }
    }

    updateEllipsisTooltip() {
        const hasEllipsis = this.element.nativeElement.offsetWidth < this.element.nativeElement.scrollWidth;
        if (hasEllipsis) {
            this.tooltipDirective.type = 'system';
            this.tooltipDirective.text = this.element.nativeElement.textContent;
        }
        this.hasEllipsis.emit(hasEllipsis);
    }
}
