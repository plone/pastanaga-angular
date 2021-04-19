import {
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    AfterViewInit,
    ContentChild,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import { ExpanderBodyDirective } from './expander.directive';
import { markForCheck } from '../common';

export const transitionDuration = 160;

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
    contentHidden = false;

    constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.updateContentHeight();
    }

    toggleExpand() {
        // when expanded, we collapse directly and hide content after the transition delay
        if (this.expanded) {
            this.expanded = false;
            setTimeout(() => {
                this.contentHidden = true;
                markForCheck(this.cdr);
            }, transitionDuration);
        } else {
            // when collapsed, we remove display: none before expand the panel so the animation is visible
            this.contentHidden = false;
            setTimeout(() => {
                this.expanded = true;
                markForCheck(this.cdr);
            }, 0);
        }
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
