import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { PaFormControlDirective } from '../../form-field';
import { takeUntil } from 'rxjs/operators';
import { detectChanges } from '../../../common';

@Component({
  selector: 'pa-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CheckboxComponent extends PaFormControlDirective implements OnChanges, AfterViewInit {
  @Input({ transform: booleanAttribute }) noEllipsis = false;
  @Input() set indeterminate(value: boolean) {
    this.isIndeterminate = value;
    if (value) {
      this.control.patchValue(false);
    }
  }

  @Output() indeterminateChange = new EventEmitter<boolean>();
  @ViewChild('htmlElement') htmlElementRef?: ElementRef;

  override fieldType = 'checkbox';
  isChecked = false;
  isIndeterminate = false;

  constructor(
    protected override element: ElementRef,
    @Optional() @Self() protected override parentControl: NgControl,
    protected override cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {
    super(element, parentControl, cdr);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  ngAfterViewInit() {
    this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe((val) => {
      this.isChecked = val;
      if (val) {
        this.isIndeterminate = false;
        this.indeterminateChange.emit(false);
      }
      detectChanges(this.cdr);
    });
    this.control.statusChanges.pipe(takeUntil(this.terminator$)).subscribe((status) => {
      this.describedById = status === 'INVALID' ? `${this.id}-hint` : undefined;
      detectChanges(this.cdr);
    });
  }

  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    if (this.htmlElementRef) {
      this.renderer.setProperty(this.htmlElementRef?.nativeElement, 'disabled', isDisabled);
    }
  }
}
