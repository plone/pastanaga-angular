import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

let nextId = 0;

@Component({
    selector: 'pa-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['../controls.scss', './slider.component.scss'],
})
export class SliderComponent implements OnInit {
    @Input() id: string;
    @Input() name: string;
    @Input() min = 0;
    @Input() max = 100;
    @Input() step = 1;
    @Input() help: string;
    @Input() isDisabled: boolean;
    @Output() valueChange: EventEmitter<number> = new EventEmitter();
    helpId: string;
    rangeValue: number;

    ngOnInit() {
        if (!this.id) {
            this.id = `field-range-${nextId++}`;
        }
        this.name = this.name || this.id;
        this.helpId = `${this.id}-help`;
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
