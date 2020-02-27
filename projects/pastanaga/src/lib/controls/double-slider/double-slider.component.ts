import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';

let nextId = 0;

@Component({
    selector: 'pa-double-slider',
    templateUrl: './double-slider.component.html',
    styleUrls: ['./double-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoubleSliderComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
    @Input() id?: string;
    @Input() help?: string;
    @Input() minRange = 0;
    @Input() maxRange = 100;
    @Input() step = 5;
    @Input() values: number[] = [this.minRange, this.maxRange];
    @Input() isDisabled = false;
    @Output() valuesChange: EventEmitter<number[]> = new EventEmitter<number[]>();

    thumbWidth = 16;
    thumbBorderWidth = 1;
    trackHeight = 4;

    isDraggingLeft = false;
    isDraggingRight = false;

    width = 0;
    range = 0;
    rangeK = 0;
    thumbRealWidth = 0;
    helpId = '';

    @ViewChild('slider', { static: true }) slider?: ElementRef;
    @ViewChild('container', { static: true }) container?: ElementRef;
    @ViewChild('track', { static: true }) track?: ElementRef;
    @ViewChild('thumbLeft', { static: true }) thumbLeft?: ElementRef;
    @ViewChild('thumbRight', { static: true }) thumbRight?: ElementRef;
    @ViewChild('outputLeft') outputLeft?: ElementRef;
    @ViewChild('outputRight') outputRight?: ElementRef;

    ngAfterViewInit() {
        if (!!this.container) {
            this.width = this.container.nativeElement.getBoundingClientRect().width;
        }

        this.initSlider();

        if (!!this.thumbLeft) {
            this.thumbLeft.nativeElement.addEventListener('mousedown', this.startDraggingLeft.bind(this), false);
        }
        if (!!this.thumbRight) {
            this.thumbRight.nativeElement.addEventListener('mousedown', this.startDraggingRight.bind(this), false);
        }
    }

    ngOnInit() {
        this.id = !this.id ? `field-double-slider-${nextId++}` : `${this.id}-double-slider`;
        this.helpId = `${this.id}-help`;
    }

    ngOnChanges(changes) {
        if (changes.values && changes.values.currentValue) {
            this.initSlider();
        }

        if (changes.minRange && typeof changes.minRange.currentValue !== 'number') {
            this.minRange = 0;
        }

        if (changes.maxRange && typeof changes.maxRange.currentValue !== 'number') {
            this.maxRange = 100;
        }

        if (changes.step && typeof changes.step.currentValue !== 'number') {
            this.step = 5;
        }
    }

    ngOnDestroy() {
        if (!!this.thumbLeft) {
            this.thumbLeft.nativeElement.removeEventListener('mousedown', this.startDraggingLeft, false);
        }
        if (!!this.thumbRight) {
            this.thumbRight.nativeElement.removeEventListener('mousedown', this.startDraggingRight, false);
        }
    }

    private initSlider() {
        this.range = this.maxRange - this.minRange;
        this.rangeK = this.width / this.range;
        this.thumbRealWidth = this.thumbWidth + 2 * this.thumbBorderWidth;

        if (!!this.slider) {
            this.slider.nativeElement.style.height = this.trackHeight + 'px';
            this.slider.nativeElement.style.width = this.width + 'px';
            this.slider.nativeElement.style.paddingLeft = (this.values[0] - this.minRange) * this.rangeK + 'px';
            this.slider.nativeElement.style.paddingRight = this.width - this.values[1] * this.rangeK + 'px';
        }
        if (!!this.track) {
            this.track.nativeElement.style.width = this.values[1] * this.rangeK - this.values[0] * this.rangeK + 'px';
        }

        if (!!this.thumbLeft) {
            this.initThumb(this.thumbLeft, this.values[0]);
        }
        if (!!this.thumbRight) {
            this.initThumb(this.thumbRight, this.values[1]);
        }
    }

    stopDragging() {
        this.isDraggingLeft = false;
        this.isDraggingRight = false;
    }

    @HostListener('mouseup')
    mouseUp() {
        this.stopDragging();
    }

    @HostListener('mouseleave')
    mouseLeave() {
        this.stopDragging();
    }

    @HostListener('mousemove', ['$event'])
    moveThumb($event) {
        if (!this.isDisabled && (this.isDraggingLeft || this.isDraggingRight) &&
            this.container && this.thumbLeft && this.slider && this.track && this.thumbRight) {
            const mousePos = this.oMousePos(this.container.nativeElement, $event);
            const leftValue =
                (this.isDraggingLeft) ? Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[0];
            const rightValue =
                (this.isDraggingRight) ? Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[1];

            if (this.isDraggingLeft) {

                if (leftValue < rightValue - (this.thumbRealWidth / 2) && leftValue >= this.minRange) {
                    this.values[0] = leftValue;
                    this.thumbLeft.nativeElement.style.left = (leftValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
                    this.slider.nativeElement.style.paddingLeft = (leftValue - this.minRange) * this.rangeK + 'px';
                    this.track.nativeElement.style.width = (rightValue - leftValue) * this.rangeK + 'px';
                }
            } else if (this.isDraggingRight) {

                if (rightValue > leftValue + (this.thumbRealWidth / 2) &&
                    rightValue <= this.maxRange) {
                    this.values[1] = rightValue;
                    this.thumbRight.nativeElement.style.left =
                        (rightValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
                    this.slider.nativeElement.style.paddingRight = (this.maxRange - rightValue) * this.rangeK + 'px';
                    this.track.nativeElement.style.width = (rightValue - leftValue) * this.rangeK + 'px';
                }
            }

            this.valuesChange.emit(this.values);
        }
    }

    private initThumb(thumb: ElementRef, thumbValue: number) {
        thumb.nativeElement.style.width = thumb.nativeElement.style.height = this.thumbWidth + 'px';
        thumb.nativeElement.style.borderWidth = this.thumbBorderWidth + 'px';
        thumb.nativeElement.style.top = -(this.thumbWidth / 2 + this.thumbBorderWidth - this.trackHeight / 2) + 'px';
        thumb.nativeElement.style.left = (thumbValue - this.minRange) * this.rangeK - (this.thumbRealWidth / 2) + 'px';
    }

    private startDraggingLeft() {
        this.isDraggingLeft = true;
    }

    private startDraggingRight() {
        this.isDraggingRight = true;
    }

    private oMousePos(element, evt) {
        const ClientRect = element.getBoundingClientRect();
        return {
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
        };
    }
}
