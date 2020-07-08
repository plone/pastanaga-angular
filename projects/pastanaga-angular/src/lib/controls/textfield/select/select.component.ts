import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
} from '@angular/core';
import { BaseTextField } from '../base-text-field';
import { ControlType, OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';
import { OptionComponent } from '../../../dropdown/option/option.component';
import { takeUntil } from 'rxjs/operators';
import { markForCheck } from '../../../common';

@Component({
    selector: 'pa-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends BaseTextField implements AfterContentInit, OnInit, OnDestroy {
    @Input()
    get label(): string {
        return this._label || '';
    }
    set label(value: string) {
        this._label = value;
    }
    @Input()
    get options(): (OptionModel | OptionSeparator | OptionHeaderModel)[] {
        return this._options;
    }
    set options(value: (OptionModel | OptionSeparator | OptionHeaderModel)[]) {
        this._options = value;
        const selectedOption: OptionModel | undefined = this._options.find(
            (option) => option.type === ControlType.option && (option as OptionModel).selected
        ) as OptionModel | undefined;
        if (selectedOption) {
            this.updateValue(selectedOption.value, selectedOption.label);
        }
    }

    /** All of the defined select options. */
    @ContentChildren(OptionComponent, { descendants: true }) optionComponents?: QueryList<OptionComponent>;

    _fieldType = 'dropdown';
    _options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    _types = ControlType;
    _displayValue = '';

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();
        if (!!this.optionComponents && this.optionComponents.length > 0) {
            this.optionComponents.forEach((option) =>
                option.selectOption.pipe(takeUntil(this.terminator)).subscribe(() => this.selectNgContentOption(option))
            );

            // Setup initial selected option if any
            if (!!this._value) {
                const selected = this.optionComponents.find((option) => option.value === this._value);
                if (!!selected) {
                    this.selectNgContentOption(selected);
                }
            }
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    selectListOption(event: MouseEvent | KeyboardEvent, selectedOption: OptionModel) {
        if (!selectedOption.disabled) {
            this._options = this._options.map((option) => {
                return option.type === ControlType.option
                    ? {
                          ...option,
                          selected: (option as OptionModel).id === selectedOption.id,
                      }
                    : option;
            });
            this.updateValue(selectedOption.value, selectedOption.label);
        }
    }

    filterOptions(inputValue: string | number) {
        const value = `${inputValue}`.toLocaleLowerCase();
        if (!!this.optionComponents && this.optionComponents.length > 0) {
            this.optionComponents.forEach((option) => {
                option._hidden = !option.text.toLocaleLowerCase().includes(value);
                option.refresh();
            });
        }
        if (this._options.length > 0) {
            this._options = this._options.map((option) => {
                const newOption = { ...option };
                if (option.type === ControlType.option) {
                    (newOption as OptionModel).filtered = !(option as OptionModel).label
                        .toLocaleLowerCase()
                        .includes(value);
                }
                return newOption;
            });
            markForCheck(this.cdr);
        }
    }

    private selectNgContentOption(selectedOption: OptionComponent) {
        if (!!this.optionComponents) {
            this.optionComponents.forEach((option) => {
                option._selected = option.value === selectedOption.value;
                option.refresh();
            });
        }
        this.updateValue(selectedOption.value, selectedOption.text);
    }

    private updateValue(value: string, display: string) {
        this._displayValue = display;
        this._value = value;
        this.valueChange.emit(this._value);
        this.resetFilter();
    }

    private resetFilter() {
        if (!!this.optionComponents) {
            this.optionComponents.forEach((option) => {
                option._hidden = false;
                option.refresh();
            });
        }
        if (this._options.length > 0) {
            this._options = this._options.map((option) => {
                const newOption = { ...option };
                if (option.type === ControlType.option) {
                    (newOption as OptionModel).filtered = false;
                }
                return newOption;
            });
        }
    }
}
