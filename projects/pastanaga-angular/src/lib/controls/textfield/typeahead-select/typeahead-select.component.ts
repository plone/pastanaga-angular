import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import { OptionType, SelectComponent } from '../select';
import { NgControl } from '@angular/forms';
import { ControlType, OptionModel } from '../../control.model';

@Component({
  selector: 'pa-typeahead-select',
  templateUrl: './typeahead-select.component.html',
  styleUrls: ['./typeahead-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeaheadSelectComponent extends SelectComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() override set options(values: OptionType[] | null) {
    super.options = values;
    this._dropdownOptionsBackup = [...this.dropdownOptions];
  }

  get allOptions(): OptionModel[] {
    if (this._dropdownOptionsBackup.length > 0) {
      return this._dropdownOptionsBackup.filter((option) => option.type === ControlType.option) as OptionModel[];
    } else {
      return (this.ngContent?.toArray() || []).map(
        (content) => new OptionModel({ id: content.value, value: content.value, label: content.text }),
      );
    }
  }

  private _dropdownOptionsBackup: OptionType[] = [];

  constructor(
    protected override element: ElementRef,
    @Optional() @Self() protected override parentControl: NgControl,
    public override cdr: ChangeDetectorRef,
  ) {
    super(element, parentControl, cdr);
  }

  filterOptions() {
    const value: string = this.selectInput?.nativeElement.value || '';
    const lowerCaseValue = value.toLocaleLowerCase();

    if (!value) {
      this.resetOptions();
    } else {
      this.dropdownOptions = [
        ...this.allOptions.filter((option) => option.label.toLocaleLowerCase().includes(lowerCaseValue)),
      ];
    }
  }

  override dropDownClosed() {
    super.dropDownClosed();
    this.resetOptions();
  }

  override onBlur() {
    super.onBlur();
    if (this.selectInput) {
      if (!this.control.value) {
        this.displayedValue = '';
        this.selectInput.nativeElement.value = '';
      } else {
        this._updateDisplayedValue(this.control.value);
        this.selectInput.nativeElement.value = this.displayedValue;
      }
    }
  }

  private resetOptions() {
    this.dropdownOptions = [...this._dropdownOptionsBackup];
  }
}
