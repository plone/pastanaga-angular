import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlModel } from '../control.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '../../translate/translate.pipe';

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
})
export class CheckboxTreeComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() id?: string;
    @Input() checkboxes?: ControlModel[];
    @Input() getChildren?: Function;
    @Input() isChildren = false;
    @Input() doLoadChildren = true;
    @Input() shouldSort = true;
    @Input() isBadgeVisible = true;
    @Input() isSelectAllVisible = true;
    @Input() isCountVisible = false;

    @Output() selection: EventEmitter<string[]> = new EventEmitter();
    @Output() allSelected: EventEmitter<boolean> = new EventEmitter();

    onChange: any;
    onTouched: any;

    isAllSelected = false;
    isAsync = false;
    totalCount = 0;
    totalSelected = 0;

    constructor(
        private translate: TranslatePipe,
    ) {
    }

    ngOnInit() {
        this.id = !this.id ? `fieldset-checkbox-tree-${nextId++}` : `${this.id}-checkbox-tree`;
    }

    ngOnChanges(changes) {
        if (changes.getChildren) {
            this.isAsync = typeof this.getChildren === 'function';
        }

        if (changes.checkboxes && changes.checkboxes.currentValue && this.doLoadChildren) {
            if (this.shouldSort) {
                this.checkboxes = this.sortCheckboxes(changes.checkboxes.currentValue);
            }
            this.updateSelectionCount();
            this.loadChildren();
        }

        if (changes.doLoadChildren && changes.doLoadChildren.currentValue === true && !changes.doLoadChildren.previousValue) {
            this.loadChildren();
        }
    }

    writeValue(value: any) {
        if (!!this.checkboxes) {
            this.checkboxes.forEach(checkbox => checkbox.isSelected = value.includes(checkbox.value));
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
        this.updateSelectionCount();
        if (!!this.checkboxes) {
            this.setSelectionForAll(this.checkboxes);
        }
        this.emitSelectionChanged();
    }

    toggleSelection(isSelected: boolean, checkbox: ControlModel) {
        if (!!checkbox.children) {
            checkbox.children.forEach(child => {
                child.isSelected = isSelected;
                if (!!child.children) {
                    this.toggleSelection(isSelected, child);
                }
            });
            this.countChildren(checkbox);
        }
        this.updateAllSelected();
        this.emitSelectionChanged();
    }

    setParentState(parent: ControlModel) {
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
    }

    private countChildren(checkbox: ControlModel) {
        checkbox.selectedChildren = checkbox.children.filter(child => child.isSelected).length;
    }

    private updateSelectionCount() {
        if (this.isCountVisible && !!this.checkboxes) {
            this.totalCount = 0;
            this.totalSelected = 0;
            this.countThemAll(this.checkboxes);
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
        if (!!this.checkboxes) {
            this.checkboxes.forEach(checkbox => this.updateSelectedValues(checkbox, selectedValues));
        }
        return selectedValues;
    }

    private updateSelectedValues(checkbox, selectedValues: string[]) {
        if (checkbox.isSelected) {
            selectedValues.push(checkbox.value);
        }
        if (!!checkbox.children) {
            checkbox.children.forEach(child => this.updateSelectedValues(child, selectedValues));
        }
    }

    private updateAllSelected() {
        if (!this.isChildren && !!this.checkboxes) {
            this.isAllSelected = this.checkboxes.every(checkbox => this.areAllChildrenSelected(checkbox));
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
        if (!!this.checkboxes) {
            if (this.shouldSort) {
                this.checkboxes = this.sortCheckboxes(this.checkboxes);
            }
            if (this.isAsync && !!this.getChildren) {
                for (const checkbox of this.checkboxes) {
                    if (!!checkbox.children) {
                        continue;
                    }

                    this.getChildren(checkbox).subscribe(children => {
                        let selectedChildren = 0;
                        checkbox.children = children.map(child => {
                            child.isSelected = checkbox.isSelected;
                            if (child.isSelected) {
                                selectedChildren++;
                            }
                            return child;
                        });
                        checkbox.totalChildren = children.length;
                        checkbox.selectedChildren = selectedChildren;
                    });
                }
            }
            this.updateSelectionCount();
        }
    }

    private sortCheckboxes(checkboxes: ControlModel[]): ControlModel[] {
        if (checkboxes && checkboxes.length > 0) {
            checkboxes.map(checkbox => this.translate.transform(checkbox.label || '')).forEach((labels => {
                checkboxes = checkboxes.map(checkbox => {
                    checkbox.label = typeof labels[checkbox.label] === 'string' ? labels[checkbox.label] : checkbox.label;
                    return checkbox;
                }).sort(this.alphabeticalSorting);
            }));
        }
        return checkboxes;
    }

    private alphabeticalSorting(a, b) {
        const aLabel = a.label || '';
        const bLabel = b.label || '';
        return aLabel.toLocaleLowerCase().localeCompare(bLabel.toLowerCase());
    }
}
