import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, ContentChild } from '@angular/core';
import { ExpanderBodyDirective } from './expander.directive';

@Component({
    selector: 'pa-expander',
    templateUrl: './expander.component.html',
    styleUrls: ['./expander.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpanderComponent implements AfterViewInit {
    @ContentChild(ExpanderBodyDirective, { read: ElementRef }) expanderContent?: ElementRef;

    expanded = true;

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.elementRef.nativeElement.style.setProperty(
                '--contentHeight',
                `${this.expanderContent?.nativeElement.getBoundingClientRect().height}px`,
            );
        });
    }

    toggleExpand() {
        this.expanded = !this.expanded;
    }
}
