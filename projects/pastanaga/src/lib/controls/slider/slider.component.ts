import {Component, Input, Output, OnInit, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

let nextId = 0;

@Component({
    selector: 'pa-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['../controls.scss', './slider.component.scss'],
})
export class SliderComponent implements OnInit, OnChanges {
    @Input() id?: string;
    @Input() name?: string;
    @Input() min = 0;
    @Input() max = 100;
    @Input() step = 1;
    @Input() help?: string;
    @Input() isDisabled = false;
    @Output() valueChange: EventEmitter<number> = new EventEmitter();
    helpId = '';
    rangeValue = 0;

    ngOnInit() {
        this.id = !this.id ? `field-range-${nextId++}` : `${this.id}-field-range`;
        this.name = this.name || this.id;
        this.helpId = `${this.id}-help`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.min && typeof changes.min.currentValue !== 'number') {
            this.min = 0;
        }

        if (changes.max && typeof changes.max.currentValue !== 'number') {
            this.max = 100;
        }

        if (changes.step && typeof changes.step.currentValue !== 'number') {
            this.step = 5;
        }
    }

    @Input()
    get value(): number {
        return this.rangeValue;
    }

    set value(val) {
        this.rangeValue = val;
        this.valueChange.emit(this.rangeValue);
    }
}
