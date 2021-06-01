import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Inject,
} from '@angular/core';
import { detectChanges, markForCheck } from '../common';
import { WINDOW } from '@ng-web-apis/common';

const ACTION_SPACING = 8;
const SYSTEM_SPACING = 16;

@Component({
    selector: 'pa-tooltip-element',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements AfterViewInit {
    @Input() text?: string;
    @Input() id?: string;

    isAction = false;
    height = 0;
    width = 0;
    left = 0;
    top = 0;
    offset = 0;

    @ViewChild('tooltipText') tooltipText?: ElementRef;

    constructor(
        public cdr: ChangeDetectorRef,
        @Inject(WINDOW) private window: any, // we need `any` so the non-Ivy compilation do not break when building the lib bundle
    ) {}

    ngAfterViewInit() {
        this.show();
    }

    show() {
        if (!!this.tooltipText) {
            this.tooltipText.nativeElement.style.left = this.getLeftPosition() + 'px';
            this.tooltipText.nativeElement.style.top = this.getTopPosition() + 'px';
            this.adjustPosition(); // once position set, check if too far horizontally or vertically
            this.tooltipText.nativeElement.setAttribute('aria-expanded', true);
            detectChanges(this.cdr);
        }
    }

    hide() {
        if (!!this.tooltipText) {
            this.tooltipText.nativeElement.setAttribute('aria-expanded', false);
            markForCheck(this.cdr);
        }
    }

    private getLeftPosition(): number {
        if (this.isAction && !!this.tooltipText) {
            const tooltipWidth = this.tooltipText.nativeElement.offsetWidth;
            return this.left + this.width / 2 - tooltipWidth / 2;
        } else {
            return this.left + SYSTEM_SPACING;
        }
    }

    private getTopPosition(): number {
        if (this.isAction) {
            return this.top + this.height + ACTION_SPACING + this.offset - this.window.scrollY;
        } else {
            return this.top + SYSTEM_SPACING + this.offset - this.window.scrollY;
        }
    }

    private adjustPosition() {
        if (!!this.tooltipText) {
            const rect = this.tooltipText.nativeElement.getBoundingClientRect();
            let left: number = parseInt(this.tooltipText.nativeElement.style.left.replace('px', ''), 10);
            const spacing = this.isAction ? ACTION_SPACING : SYSTEM_SPACING;
            if (rect.right > this.window.innerWidth) {
                left = left - (rect.right - this.window.innerWidth) - spacing;
                this.tooltipText.nativeElement.style.left = `${left}px`;
            }
            if (rect.bottom > this.window.innerHeight) {
                let top: number = parseInt(this.tooltipText.nativeElement.style.top.replace('px', ''), 10);
                top = top - (rect.bottom - this.window.innerHeight) - spacing;
                this.tooltipText.nativeElement.style.top = `${top}px`;
                this.tooltipText.nativeElement.style.left = `${left + spacing + this.width / 2 + rect.width / 2}px`;
            }
        }
    }
}
