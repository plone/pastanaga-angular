import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';

const VERTICAL_SEPARATION = 9;
const HORIZONTAL_SEPARATION = 5;

@Component({
    selector: 'pa-tooltip-element',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements AfterViewInit {

    @Input() text: string;

    height: number;
    width: number;
    left: number;
    top: number;
    mouseX: number;
    mouseY: number;

    @ViewChild('tooltip') tooltip;
    @ViewChild('tooltipText') tooltipText;

    ngAfterViewInit() {
        const topPosition = this.getTopPosition(this.mouseY);

        let leftPosition = 0;

        // If we have to center the tooltip
        if (this.width) {
            leftPosition = this.getCenteredLeftPosition();
        } else {
            leftPosition = this.mouseX;
        }

        const offset = this.getLeftPositionOffset(leftPosition);
        const left = leftPosition - offset;

        this.tooltip.nativeElement.style.left = left + 'px';
        this.tooltip.nativeElement.style.top = topPosition + 'px';
        this.tooltip.nativeElement.style.opacity = 1;
    }

    private getCenteredLeftPosition(): number {
        const tooltipWidth = this.tooltipText.nativeElement.offsetWidth;
        return  (this.left + this.width / 2) - (tooltipWidth / 2);
    }

    private getLeftPositionOffset(leftPosition: number): number {
        if (!this.tooltipText) {
            return 0;
        }

        const tooltipWidth = this.tooltipText.nativeElement.offsetWidth;
        const screenWidth = window.innerWidth;

        let rightPosition = leftPosition + tooltipWidth - screenWidth;
        if (document.querySelector('[cdk-scrollable]')) {
            rightPosition += document.querySelector('[cdk-scrollable]').scrollTop;
        }

        let offset = rightPosition > 0 ? rightPosition + HORIZONTAL_SEPARATION : 0;
        if (this.text) {
            const availableWidth = screenWidth - leftPosition + offset;
            const approxTextWidth = Math.round(this.text.length * 5.2);
            if (availableWidth < approxTextWidth) {
                offset = Math.min(approxTextWidth, 300);
            }
        }
        return offset;
    }

    private getTopPosition(y: number): number {
        let topPosition = (this.height ? this.top + this.height : y) + VERTICAL_SEPARATION;

        if (document.querySelector('[cdk-scrollable]')) {
            topPosition += document.querySelector('[cdk-scrollable]').scrollTop;
        }

        return topPosition;
    }
}
