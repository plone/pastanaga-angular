import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { detectChanges, markForCheck } from '../../../common';
import { PaFormControlDirective } from '../../form-field';
import { NgControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pa-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent extends PaFormControlDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input({ transform: booleanAttribute }) labelOnRight = false;
  @Input({ transform: booleanAttribute }) hasFocus = false;

  @ViewChild('inputElement') input?: ElementRef;
  @ViewChild('label') labelElement?: ElementRef;

  label = '';
  hasLabel = true;
  isChecked = false;

  constructor(
    protected override element: ElementRef,
    @Optional() @Self() protected override parentControl: NgControl,
    protected override cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {
    super(element, parentControl, cdr);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['hasFocus'] && !!this.input) {
      if (changes['hasFocus'].currentValue) {
        this.input.nativeElement.focus();
      } else {
        this.input.nativeElement.blur();
      }
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.isChecked = this.control.value;
  }

  ngAfterViewInit() {
    this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe((val) => {
      this.isChecked = val;
      detectChanges(this.cdr);
    });
    this.control.statusChanges.pipe(takeUntil(this.terminator$)).subscribe((status) => {
      this.describedById = status === 'INVALID' ? `${this.id}-hint` : undefined;
      detectChanges(this.cdr);
    });
    if (this.hasFocus && !!this.input) {
      this.input.nativeElement.focus();
    }
    if (!!this.labelElement) {
      this.label = this.labelElement.nativeElement.textContent.trim();
      // avoid expressionChanged after it was checked since _hasLabel is true by default
      setTimeout(() => {
        this.updateLabelDisplay();
      });
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  updateState(event: boolean) {
    if (!this.control.disabled) {
      this.control.setValue(event);
    }
  }

  updateLabelDisplay() {
    this.hasLabel = this.label.length > 0;
    markForCheck(this.cdr);
  }

  onFocus() {
    this.hasFocus = true;
  }

  onBlur() {
    this.hasFocus = false;
  }

  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    if (this.input) {
      this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled);
    }
  }
}
