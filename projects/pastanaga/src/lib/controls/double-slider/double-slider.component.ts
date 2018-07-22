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
    ViewChild
} from '@angular/core';
import 'rxjs/add/operator/debounceTime';

let nextId = 0;

@Component({
    selector: 'pa-double-slider',
    templateUrl: './double-slider.component.html',
    styleUrls: ['../controls.scss', './double-slider.component.scss'],
})
export class DoubleSliderComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
    @Input() id: string;
    @Input() help: string;
    @Input() minRange = 0;
    @Input() maxRange = 100;
    @Input() step = 5;
    @Input() values: number[] = [this.minRange, this.maxRange];
    @Input() isDisabled: boolean;
    @Output() valuesChange: EventEmitter<number[]> = new EventEmitter<number[]>();

    thumbWidth = 18;
    thumbBorderWidth = 1;
    trackHeight = 6;

    isDraggingLeft = false;
    isDraggingRight = false;

    width: number;
    range: number;
    rangeK: number;
    thumbRealWidth: number;
    helpId: string;

    @ViewChild('slider') slider: ElementRef;
    @ViewChild('container') container: ElementRef;
    @ViewChild('track') track: ElementRef;
    @ViewChild('thumbLeft') thumbLeft: ElementRef;
    @ViewChild('thumbRight') thumbRight: ElementRef;
    @ViewChild('outputLeft') outputLeft: ElementRef;
    @ViewChild('outputRight') outputRight: ElementRef;

    ngAfterViewInit() {
        this.width = this.container.nativeElement.getBoundingClientRect().width;

        this.initSlider();

        this.thumbLeft.nativeElement.addEventListener('mousedown', this.startDraggingLeft.bind(this), false);
        this.thumbRight.nativeElement.addEventListener('mousedown', this.startDraggingRight.bind(this), false);
    }

    ngOnInit() {
        if (!this.id) {
            this.id = `field-double-slider-${nextId++}`;
        }
        this.helpId = `${this.id}-help`;
    }

    ngOnChanges(changes) {
        if (changes.values && changes.values.currentValue) {
            this.initSlider();
        }
    }

    ngOnDestroy() {
        this.thumbLeft.nativeElement.removeEventListener('mousedown', this.startDraggingLeft, false);
        this.thumbRight.nativeElement.removeEventListener('mousedown', this.startDraggingRight, false);
    }

    private initSlider() {
        this.range = this.maxRange - this.minRange;
        this.rangeK = this.width / this.range;
        this.thumbRealWidth = this.thumbWidth + 2 * this.thumbBorderWidth;

        this.slider.nativeElement.style.height = this.trackHeight + 'px';
        this.slider.nativeElement.style.width = this.width + 'px';
        this.slider.nativeElement.style.paddingLeft = (this.values[0] - this.minRange) * this.rangeK + 'px';
        this.slider.nativeElement.style.paddingRight = this.width - this.values[1] * this.rangeK + 'px';

        this.track.nativeElement.style.width = this.values[1] * this.rangeK - this.values[0] * this.rangeK + 'px';

        this.initThumb(this.thumbLeft, this.values[0]);
        this.initThumb(this.thumbRight, this.values[1]);
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
        if (!this.isDisabled && (this.isDraggingLeft || this.isDraggingRight)) {
            const mousePos = this.oMousePos(this.container.nativeElement, $event);
            const leftValue = (this.isDraggingLeft) ?
                Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[0];
            const rightValue = (this.isDraggingRight) ?
                Math.round(mousePos.x / this.rangeK / this.step) * this.step + this.minRange : this.values[1];

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
