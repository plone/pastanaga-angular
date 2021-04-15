import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, ContentChild, Input } from '@angular/core';
import { ExpanderBodyDirective } from './expander.directive';

@Component({
    selector: 'pa-expander',
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpanderComponent implements AfterViewInit {
    @Input() set contentLoaded(value: any) {
        this.updateContentHeight();
    }

    @ContentChild(ExpanderBodyDirective, { read: ElementRef }) expanderContent?: ElementRef;

    expanded = true;

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.updateContentHeight();
    }

    toggleExpand() {
        this.expanded = !this.expanded;
    }

    private updateContentHeight() {
        setTimeout(() => {
            this.elementRef.nativeElement.style.setProperty(
                '--contentHeight',
                `${this.expanderContent?.nativeElement.getBoundingClientRect().height}px`,
            );
        });
    }
}
