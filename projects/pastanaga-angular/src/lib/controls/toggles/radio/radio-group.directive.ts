import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    forwardRef,
    OnDestroy,
    Optional,
    QueryList,
    Self,
} from '@angular/core';
import { PaFormControlDirective } from '../../form-field';
import { RadioComponent } from './radio.component';
import { NgControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: 'pa-radio-group',
    exportAs: 'paRadioGroup',
    host: {
        role: 'radiogroup',
    },
})
export class RadioGroupDirective extends PaFormControlDirective implements AfterViewInit, OnDestroy {
    @ContentChildren(forwardRef(() => RadioComponent), { descendants: true }) _radios?: QueryList<RadioComponent>;

    override fieldType = 'radiogroup';

    constructor(
        protected override element: ElementRef,
        @Optional() @Self() protected override parentControl: NgControl,
        protected override cdr: ChangeDetectorRef,
    ) {
        super(element, parentControl, cdr);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this._radios) {
                this._radios.forEach((radio) => {
                    radio.name = this.name;
                    radio.change.pipe(takeUntil(this.terminator$)).subscribe((res) => this.writeValue(res.value));
                    radio._markForCheck();
                });
            }
        });
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
    }

    override setDisabledState(value: boolean) {
        super.setDisabledState(value);
        setTimeout(() => {
            if (this._radios) {
                this._radios.forEach((radio) => {
                    radio.disabled = this.disabled;
                    radio._markForCheck();
                });
            }
        });
    }

    override writeValue(value: any) {
        super.writeValue(value);
        if (value) {
            setTimeout(() => {
                const radio = this._radios?.find((r) => r.value === value);
                if (radio && !radio.checked) {
                    radio.select();
                }
            }, 200);
        }
    }
}
