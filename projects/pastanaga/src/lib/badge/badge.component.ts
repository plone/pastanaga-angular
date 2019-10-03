import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ChangeDetectorRef,
    ViewRef
} from '@angular/core';
import { BadgeModel } from './badge.model';

@Component({
    selector: 'pa-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent implements AfterViewInit {

    @Input() set color(value) {
        this.colorClass = `pa-badge-${value}`;
    }
    @Input() set hexaColor(value) {
        if (!this.colorClass) {
            this.colorStyle = {
                'background-color': value
            };
            const luminance = this.calcLuminance(value);
            if (luminance < 0.61) {
                this.colorStyle['color'] = '#fff';
            }
        }
    }
    @Input() isAccented = false;
    @Input() isSmall = false;
    @Input() isError = false;
    @Input() canBeRemoved = false;
    @Input() maxWidth?: string;
    @Input() set value(val) {
        this._value = val;
        // accented and small by default when badge of value kind
        if (typeof this.isAccented === 'undefined') {
            this.isAccented = true;
        }
        if (typeof this.isSmall === 'undefined') {
            this.isSmall = true;
        }
    }
    @Input() of?: number;
    @Input() buttons?: BadgeModel[];

    @Output() remove: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() render: EventEmitter<ElementRef> = new EventEmitter();

    colorClass = '';
    colorStyle?: {};
    text = '';
    _value?: number;

    @ViewChild('textContent', { static: false }) textContent?: ElementRef;

    constructor(
        private elementRef: ElementRef,
        private changeDetector: ChangeDetectorRef,
    ) {}

    ngAfterViewInit() {
        if (!!this.maxWidth && !!this.textContent) {
            const textContent = this.textContent;
            setTimeout(() => {
                if (!!this.changeDetector && !(this.changeDetector as ViewRef).destroyed) {
                    this.text = textContent.nativeElement.textContent.trim();
                    this.changeDetector.detectChanges();
                }
            });
        }
        this.render.emit(this.elementRef);
    }


    /**
     * Solution to calc luminance is coming from
     * https://stackoverflow.com/a/1754281/2116063
     * and https://stackoverflow.com/a/12043228/2116063 (for javascript adaptation)
     */

    /* tslint:disable:no-bitwise */
    private calcLuminance(hexa: string): number {
        const color = hexa.substring(1);      // strip #
        const rgb = parseInt(color, 16);   // convert rrggbb to decimal
        const r = (rgb >> 16) & 0xff;  // extract red
        const g = (rgb >> 8) & 0xff;  // extract green
        const b = (rgb >> 0) & 0xff;  // extract blue

        return (r * 0.299 + g * 0.587 + b * 0.114) / 256;
    }

    /* tslint:enable:no-bitwise */

}
