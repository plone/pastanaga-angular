import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
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
    class: 'pa-radio-group',
  },
})
export class RadioGroupDirective extends PaFormControlDirective implements AfterViewInit, OnDestroy {
  @Input({ transform: booleanAttribute }) noBackground = false;

  @ContentChildren(forwardRef(() => RadioComponent), { descendants: true }) _radios?: QueryList<RadioComponent>;

  override fieldType = 'radiogroup';
  private checkedRadio?: RadioComponent;
  private initialSetDisabledState = true;
  radioCount = 0;

  @HostBinding('class.background-striped') get alternateBackgrounds() {
    return this.radioCount > 2 && !this.noBackground;
  }

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
        radio.change.pipe(takeUntil(this.terminator$)).subscribe((res) => {
          if (res.checked) {
            this.writeValue(res.value);
          }
          if (this.control.pristine) {
            this.control.markAsDirty();
          }
        });
        radio._markForCheck();
      });
      this.radioCount = this._radios?.length || 0;
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override setDisabledState(value: boolean) {
    // we skip the first call to `setDisabledState` if `disabled` is `false`,
    // to prevent overriding the 'disable' property of individual pa-radio components,
    if (!this.initialSetDisabledState || value === true) {
      super.setDisabledState(value);

      this.waitForRadios(() => {
        this._radios?.forEach((radio) => {
          radio.disabled = this.disabled;
          radio._markForCheck();
        });
      });
    }
    this.initialSetDisabledState = false;
  }

  override writeValue(value: any) {
    super.writeValue(value);
    if (value) {
      this.waitForRadios(() => {
        if (this.checkedRadio && this.checkedRadio.value !== value) {
          this.checkedRadio.unselect();
        }
        const radio = this._radios?.find((r) => r.value === value);
        this.checkedRadio = radio;
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
