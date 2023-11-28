import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { markForCheck, trimString } from '../../../common';

let nextId = 0;

@Component({
  selector: 'pa-radio',
  templateUrl: './radio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements AfterContentInit, OnChanges {
  @Input({ transform: trimString }) id = `pa-radio-${nextId++}`;
  @Input({ transform: trimString }) name = '';
  @Input({ transform: trimString }) value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: trimString }) ariaLabel = '';
  @Input({ transform: trimString }) help = '';
  @Input({ transform: booleanAttribute }) noEllipsis = false;

  @Output() change: EventEmitter<{ value: string; checked: boolean }> = new EventEmitter();

  @ViewChild('label', { read: ElementRef, static: true }) label?: ElementRef;

  checked = false;
  hasLabel = false;
  describedById = `${this.id}-hint`;

  constructor(
    private element: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentInit() {
    this.hasLabel = this.label?.nativeElement.innerHTML.length > 0;
    this.ariaLabel = this.hasLabel ? this.label?.nativeElement.innerHTML : this.ariaLabel || this.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      this.describedById = `${this.id}-hint`;
    }
  }

  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    markForCheck(this.cdr);
  }

  _onInputChange() {
    if (!this.disabled) {
      if (!this.checked) {
        this.checked = true;
      }
      this.change.emit({ value: this.value, checked: this.checked });
      this.cdr.markForCheck();
    }
  }

  /**
   * Select this radio from the radio-group, allowing to set the value coming from a form.
   */
  select() {
    this.element.nativeElement.querySelector('.pa-toggle-control').checked = true;
    this._onInputChange();
  }

  /**
   * Unselect this radio from the radio-group when another radio is selected.
   */
  unselect() {
    this.element.nativeElement.querySelector('.pa-toggle-control').checked = false;
    this.checked = false;
    this.cdr.markForCheck();
  }
}
