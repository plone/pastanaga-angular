import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import { ControlModel } from '../control.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '../../translate/translate.pipe';
import { markForCheck } from 'pastanaga-angular/lib/common/utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;

@Component({
    selector: 'pa-checkbox-tree',
    templateUrl: './checkbox-tree.component.html',
    styleUrls: ['./checkbox-tree.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxTreeComponent),
        multi: true,
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxTreeComponent implements ControlValueAccessor, OnInit {
    @Input() id?: string;
    @Input() set checkboxes(value) {
        if (!!value) {
            const translatedCheckboxes = value.map(checkbox => ({
                ...checkbox,
                label: this.translate.transform(checkbox.label || ''),
            }));
            this._checkboxes = this._shouldSort ? this.sortCheckboxes(translatedCheckboxes) : translatedCheckboxes;
        }
        this.updateSelectionCount();
        if (this._doLoadChildren) {
            this.loadChildren();
        }
    }
    @Input() type: 'checkbox' | 'radio' = 'checkbox';
    @Input() set getChildren(value) {
        this.isAsync = typeof value === 'function';
        if (!!value) {
            this._getChildren = value;
        }
    }
    @Input() set isChildren(value) { this._isChildren = coerceBooleanProperty(value); }
    @Input() set doLoadChildren(value) {
        const booleanValue = coerceBooleanProperty(value);
        if (!this._doLoadChildren && booleanValue) {
            this.loadChildren();
        }
        this._doLoadChildren = booleanValue;
    }
    @Input() set shouldSort(value) {this._shouldSort = coerceBooleanProperty(value); }
    @Input() isBadgeVisible = true;
    @Input() isSelectAllVisible = true;
    @Input() isCountVisible = false;

    @Output() selection: EventEmitter<string[]> = new EventEmitter();
    @Output() allSelected: EventEmitter<boolean> = new EventEmitter();

    _checkboxes: ControlModel[] = [];
    _getChildren?: Function;
    _isChildren = false;
    _doLoadChildren = true;
    _shouldSort = true;

    onChange: any;
    onTouched: any;


    isAllSelected = false;
    isAsync = false;
    totalCount = 0;
    totalSelected = 0;

    constructor(
        private translate: TranslatePipe,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.id = !this.id ? `fieldset-checkbox-tree-${nextId++}` : `${this.id}-checkbox-tree`;
    }

    writeValue(value: any) {
        if (!!this._checkboxes) {
            this._checkboxes = this._checkboxes.map(checkbox => ({...checkbox, isSelected: value === checkbox.value}));
        }
    }

    registerOnTouched(handler: any) {
        this.onTouched = handler;
    }

    registerOnChange(handler: any) {
        this.onChange = handler;
    }

    toggleSelectAll() {
        this.isAllSelected = !this.isAllSelected;
        this._checkboxes = this._checkboxes.map( checkbox => {
            const updatedCheckbox = {
                ...checkbox,
                isSelected: this.isAllSelected,
                children: this.getUpdatedChildrenSelection(this.isAllSelected, checkbox),
            };
            this.countChildren(updatedCheckbox);
            return updatedCheckbox;
        });
        this.updateSelectionCount();
        this.emitSelectionChanged();
    }

    toggleSelection(isSelected: boolean, checkbox: ControlModel) {
        checkbox.isSelected = isSelected;
        if (!!checkbox.children) {
            checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
            markForCheck(this.cdr);
            this.countChildren(checkbox);
        }
        this.updateAllSelected();
        this.emitSelectionChanged();
    }

    private getUpdatedChildrenSelection(isSelected: boolean, checkbox: ControlModel): ControlModel[] {
        return !checkbox.children ? [] : checkbox.children.map(child => {
            if (!!child.children) {
                child.children = this.getUpdatedChildrenSelection(isSelected, child);
            }
            return {...child, isSelected};
        });
    }

    setParentState(selection: string[], parent: ControlModel) {
        parent.children = (parent.children || []).map(child => ({...child, isSelected: selection.includes(this.getCheckboxValue(child))}));

        if (parent.children.every(child => child.isSelected)) {
            parent.isSelected = true;
            parent.isIndeterminate = false;
        } else {
            parent.isIndeterminate = parent.children.some(child => child.isSelected);
            if (parent.children.every(child => !child.isSelected)) {
                parent.isSelected = false;
            }
        }
        this.countChildren(parent);

        this.updateAllSelected();
        this.emitSelectionChanged();
        markForCheck(this.cdr);
    }

    toggleCheckbox(checkbox: ControlModel) {
        checkbox.isExpanded = !checkbox.isExpanded;
        markForCheck(this.cdr);
    }

    private countChildren(checkbox: ControlModel) {
        checkbox.selectedChildren = checkbox.children.filter(child => child.isSelected).length;
        markForCheck(this.cdr);
    }

    private updateSelectionCount() {
        if (this.isCountVisible && !!this._checkboxes) {
            this.totalCount = 0;
            this.totalSelected = 0;
            this.countThemAll(this._checkboxes);
        }
    }

    private countThemAll(controls: ControlModel[]) {
        this.totalCount += controls.length;
        this.totalSelected += controls.filter(control => !!control.isSelected).length;
        controls.forEach(control => {
            if (control.children) {
                this.countThemAll(control.children);
            }
        });
    }

    private emitSelectionChanged() {
        this.selection.emit(this.getSelectedValues());
        this.allSelected.emit(this.isAllSelected);
    }

    private getSelectedValues(): string[] {
        const selectedValues: string[] = [];
        if (!!this._checkboxes) {
            this._checkboxes.forEach(checkbox => this.updateSelectedValues(checkbox, selectedValues));
        }
        return selectedValues;
    }

    private updateSelectedValues(checkbox: ControlModel, selectedValues: string[]) {
        if (checkbox.isSelected) {
            selectedValues.push(this.getCheckboxValue(checkbox));
        }
        if (!!checkbox.children) {
            checkbox.children.forEach(child => this.updateSelectedValues(child, selectedValues));
        }
    }

    private getCheckboxValue(checkbox: ControlModel): string {
        return checkbox.value || checkbox.id;
    }

    private updateAllSelected() {
        if (!this._isChildren && !!this._checkboxes) {
            this.isAllSelected = this._checkboxes.every(checkbox => this.areAllChildrenSelected(checkbox));
        }
        this.updateSelectionCount();
    }

    private areAllChildrenSelected(checkbox: ControlModel): boolean {
        return !checkbox.children ? checkbox.isSelected : checkbox.isSelected &&
            checkbox.children.every(child => this.areAllChildrenSelected(child));
    }

    private setSelectionForAll(checkboxes: ControlModel[]) {
        checkboxes.forEach(checkbox => {
            checkbox.isSelected = this.isAllSelected;
            checkbox.isIndeterminate = false;
            if (!!checkbox.children) {
                this.setSelectionForAll(checkbox.children);
                this.countChildren(checkbox);
            }
        });
    }

    private loadChildren() {
        if (this.isAsync && !!this._getChildren) {
            for (const checkbox of this._checkboxes) {
                if (!!checkbox.children) {
                    continue;
                }

                this._getChildren(checkbox).subscribe(children => {
                    let selectedChildren = 0;
                    checkbox.children = children.map(child => {
                        const updatedChild = {
                            ...child,
                            label: this.translate.transform(child.label || ''),
                            isSelected: checkbox.isSelected,
                        };
                        if (updatedChild.isSelected) {
                            selectedChildren++;
                        }
                        return updatedChild;
                    });
                    checkbox.totalChildren = children.length;
                    checkbox.selectedChildren = selectedChildren;
                    markForCheck(this.cdr);
                });
            }
        } else {
            this._checkboxes.forEach(checkbox => {
                checkbox.totalChildren = !!checkbox.children ? checkbox.children.length : 0;
                checkbox.selectedChildren = !!checkbox.children ? checkbox.children.filter(child => child.isSelected).length : 0;
            });
        }
        this.updateSelectionCount();
    }

    private sortCheckboxes(checkboxes: ControlModel[]): ControlModel[] {
        return checkboxes.sort((a, b) => {
            const aLabel = a.label || '';
            const bLabel = b.label || '';
            return aLabel.toLowerCase().localeCompare(bLabel.toLowerCase());
        });
    }

    toggleRadioSelection(value: string) {
        this._checkboxes = (this._checkboxes || []).map(ctl => ({
            ...ctl,
            isSelected: ctl.value === value,
        }));
        this.emitSelectionChanged();
    }
}
