import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { BaseTextField } from '../base-text-field';
import { ControlType, OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';

@Component({
    selector: 'pa-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends BaseTextField implements AfterContentInit, OnInit, OnDestroy {
    @Input()
    get label(): string { return this._label || ''; }
    set label(value: string) { this._label = value; }
    @Input()
    get options(): (OptionModel | OptionSeparator | OptionHeaderModel)[] { return this._options; }
    set options(value: (OptionModel | OptionSeparator | OptionHeaderModel)[]) { this._options = value; }

    @Output() select: EventEmitter<{ event: MouseEvent | KeyboardEvent, option: OptionModel }> = new EventEmitter();

    _fieldType = 'dropdown';
    _options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    _types = ControlType;

    constructor(
        protected cdr: ChangeDetectorRef,
    ) {
        super(cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onSelect(event: MouseEvent | KeyboardEvent, option: OptionModel) {
        if (!option.disabled) {
            this.select.emit({event, option});
        }
    }

    filterOptions(inputValue: string | number) {
        this._value = `${inputValue}`;
        if (this._options.length > 0) {
            const value = this._value.toLocaleLowerCase();
            this._options = this._options.map(option => {
                const newOption = {...option};
                if (option.type === ControlType.option) {
                    (newOption as OptionModel).filtered = !(option as OptionModel).label.toLocaleLowerCase().includes(value)
                }
                return newOption;
            });
        }
    }
}
