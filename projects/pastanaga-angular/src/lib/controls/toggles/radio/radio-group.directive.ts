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
        style: 'display: block',
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
        this.waitForRadios(() => {
            this._radios?.forEach((radio) => {
                radio.name = this.name;
                radio.change.pipe(takeUntil(this.terminator$)).subscribe((res) => this.writeValue(res.value));
                radio._markForCheck();
            });
        });
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
    }

    override setDisabledState(value: boolean) {
        super.setDisabledState(value);

        this.waitForRadios(() => {
            this._radios?.forEach((radio) => {
                radio.disabled = this.disabled;
                radio._markForCheck();
            });
        });
    }

    override writeValue(value: any) {
        super.writeValue(value);
        if (value) {
            this.waitForRadios(() => {
                const radio = this._radios?.find((r) => r.value === value);
                if (radio && !radio.checked) {
                    radio.select();
                }
            });
        }
    }

    /**
     * Check if the radios are already in the DOM before running the callback.
     * If they are not, try every 200ms for 4s.
     *
     * @param callback
     * @private
     */
    private waitForRadios(callback: () => void) {
        setTimeout(() => {
            if (this._radios && this._radios.length > 0) {
                callback();
            } else {
                let radioCheckCounter = 0;

                const waitForRadios = window.setInterval(() => {
                    if (this._radios && this._radios.length > 0) {
                        callback();
                        clearInterval(waitForRadios);
                    } else if (radioCheckCounter === 20) {
                        clearInterval(waitForRadios);
                    } else {
                        radioCheckCounter++;
                    }
                }, 200);
            }
        });
    }
}
