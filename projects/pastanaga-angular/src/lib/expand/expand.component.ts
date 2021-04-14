import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, ContentChild } from '@angular/core';
import { ExpandBodyDirective } from './expand.directive';

@Component({
    selector: 'pa-expand',
    templateUrl: './expand.component.html',
    styleUrls: ['./expand.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandComponent implements AfterViewInit {
    @ContentChild(ExpandBodyDirective, { read: ElementRef }) expandContent?: ElementRef;

    expanded = true;

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.elementRef.nativeElement.style.setProperty(
                '--contentHeight',
                `${this.expandContent?.nativeElement.getBoundingClientRect().height}px`,
            );
        });
    }

    toggleExpand() {
        this.expanded = !this.expanded;
    }
}
