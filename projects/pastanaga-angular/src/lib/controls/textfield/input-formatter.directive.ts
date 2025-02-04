import { booleanAttribute, Directive, ElementRef, forwardRef, HostListener, Input, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const FORMATTER_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFormatterDirective),
  multi: true,
};

@Directive({
  selector: '[paInputFormatter]',
  providers: [FORMATTER_CONTROL_VALUE_ACCESSOR],
  standalone: false,
})
export class InputFormatterDirective implements ControlValueAccessor {
  @Input() paInputFormatter!: (value: any) => any;
  @Input({ transform: booleanAttribute }) paInputFormatterUpdateInput = true;
  @Input({ transform: booleanAttribute }) paInputFormatterSkip = false;

  private _writeToFormControl: (value: any) => void = () => {
    // Will be instantiated by registerOnChange
  };

  @HostListener('input') onKeyup() {
    const val = this.formatValue(this.el.nativeElement.value);
    if (this.paInputFormatterUpdateInput && val !== this.el.nativeElement.value) {
      this.el.nativeElement.value = val;
    }
    this._writeToFormControl(val);
  }

  constructor(public el: ElementRef) {}

  registerOnChange(fn: (value: any) => void) {
    this._writeToFormControl = fn;
  }

  registerOnTouched(fn: any) {
    // nothing to do
  }

  writeValue(value: any) {
    this.el.nativeElement.value = this.formatValue(value);
  }

  formatValue(value: any) {
    return this.paInputFormatterSkip || !this.paInputFormatter ? value : this.paInputFormatter(value);
  }
}
