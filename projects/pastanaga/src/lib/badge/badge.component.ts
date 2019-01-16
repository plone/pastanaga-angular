import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { BadgeModel } from './badge.model';

@Component({
    selector: 'pa-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements AfterViewInit, OnChanges {

    @Input() color?: string;
    @Input() hexaColor?: string;
    @Input() isAccented = false;
    @Input() isSmall = false;
    @Input() isError = false;
    @Input() canBeRemoved = false;
    @Input() maxWidth?: string;
    @Input() value?: number;
    @Input() of?: number;
    @Input() buttons?: BadgeModel[];

    @Output() remove: EventEmitter<null> = new EventEmitter();
    @Output() render: EventEmitter<ElementRef> = new EventEmitter();

    colorClass = '';
    colorStyle?: {};
    text = '';

    @ViewChild('textContent') textContent?: ElementRef;

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit() {
        if (!!this.maxWidth && !!this.textContent) {
            const textContent = this.textContent;
            setTimeout(() => this.text = textContent.nativeElement.textContent.trim());
        }
        this.render.emit(this.elementRef);
    }

    ngOnChanges(changes) {
        if (changes.color && changes.color.currentValue) {
            this.colorClass = `pa-badge-${changes.color.currentValue}`;
        }

        if (changes.hexaColor && changes.hexaColor.currentValue && !this.colorClass) {
            this.colorStyle = {
                'background-color': changes.hexaColor.currentValue
            };
            const luminance = this.calcLuminance(changes.hexaColor.currentValue);
            if (luminance < 0.61) {
                this.colorStyle['color'] = '#fff';
            }
        }

        // accented and small by default when badge of value kind
        if (changes.value && changes.value.currentValue) {
            if (typeof this.isAccented === 'undefined') {
                this.isAccented = true;
            }
            if (typeof this.isSmall === 'undefined') {
                this.isSmall = true;
            }
        }
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
