import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ControlModel } from '../control.model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TranslatePipe } from '../../translate/translate.pipe';
import { getCheckboxValue, sortCheckboxes } from '../checkbox.utils';

let nextId = 0;

@Component({
    selector: 'pa-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    styleUrls: ['./checkbox-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent implements OnInit, OnChanges {
    @Input() id?: string;
    @Input() type: 'checkbox' | 'radio' = 'checkbox';
    @Input() checkboxes?: ControlModel[]
    @Input() set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    @Input() set shouldSort(value) { this._shouldSort = coerceBooleanProperty(value); }
    @Input() set selectAllVisible(value) { this._selectAllVisible = coerceBooleanProperty(value); }
    @Input() set countVisible(value) { this._countVisible = coerceBooleanProperty(value); }
    @Input() set noSelectAll(value) { this._selectAllVisible = !coerceBooleanProperty(value); }

    @Output() selection: EventEmitter<string[]> = new EventEmitter();

    _checkboxes: ControlModel[] = [];
    _shouldSort = true;
    _selectAllVisible = true;
    _countVisible = false;
    _disabled = false;

    _isAllSelected = false;
    totalCount = 0;
    totalSelected = 0;

    constructor(
        private translate: TranslatePipe,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.id = !this.id ? `fieldset-checkbox-group-${nextId++}` : `${this.id}-checkbox-group`;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes.checkboxes) {
            const values: ControlModel[] = changes.checkboxes.currentValue || [];
            const translatedCheckboxes = values.map(checkbox => new ControlModel({
                ...checkbox,
                label: this.translate.transform(checkbox.label || ''),
            }));
            this._checkboxes = this._shouldSort ? sortCheckboxes(translatedCheckboxes) : translatedCheckboxes;
            this._isAllSelected = this._checkboxes.every(checkbox => checkbox.isSelected);
            this.totalCount = this._checkboxes.length;
            this.updateSelectionCount();
        }
    }

    toggleSelection(value: string) {
        if (this.type === 'radio') {
            this._checkboxes = (this._checkboxes || []).map(ctl => new ControlModel({
                ...ctl,
                isSelected: ctl.value === value,
            }));
        }
        this.updateSelectionCount();
        this.emitSelectionChanged();
    }

    toggleSelectAll() {
        this._isAllSelected = !this._isAllSelected;
        this._checkboxes = this._checkboxes.map(checkbox => new ControlModel({
            ...checkbox,
            isSelected: checkbox.isDisabled ? checkbox.isSelected : this._isAllSelected,
        }));
        this.updateSelectionCount();
        this.emitSelectionChanged();
    }

    private updateSelectionCount() {
        this.totalSelected = (this._checkboxes || []).filter(control => control.isSelected).length;
    }

    private emitSelectionChanged() {
        const selectedValues = (this._checkboxes || []).filter(control => control.isSelected).map(control => getCheckboxValue(control));
        this.selection.emit(selectedValues);
    }
}
