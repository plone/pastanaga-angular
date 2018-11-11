import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ControlModel } from '../control.model';

let nextId = 0;
let checkboxCounter = 0;

@Component({
    selector: 'pa-checkbox-tree',
    templateUrl: './checkbox-tree.component.html',
    styleUrls: ['./checkbox-tree.component.scss']
})
export class CheckboxTreeComponent implements OnInit, OnChanges {
    @Input() id: string;
    @Input() type: 'checkbox' | 'radio' = 'checkbox';
    @Input() checkboxes: ControlModel[];
    @Input() getChildren: Function;
    @Input() isChildren = false;
    @Input() doLoadChildren = true;
    @Input() shouldSort = true;
    @Input() isBadgeVisible = true;
    @Input() isSelectAllVisible = true;
    @Input() isCountVisible = false;

    @Output() selection: EventEmitter<string[]> = new EventEmitter();
    @Output() allSelected: EventEmitter<boolean> = new EventEmitter();

    isAllSelected: boolean;
    isAsync: boolean;
    totalCount: number;
    totalSelected: number;

    constructor(
        private translate: TranslateService,
    ) {
    }

    ngOnInit() {
        this.id = !this.id ? `fieldset-checkbox-tree-${nextId++}` : `${this.id}-checkbox-tree`;
    }

    ngOnChanges(changes) {
        if (typeof this.isAsync === 'undefined') {
            this.isAsync = typeof this.getChildren === 'function';
        }

        if (changes.type && changes.type.currentValue === 'radio') {
            this.isSelectAllVisible = false;
        }

        if (changes.checkboxes && changes.checkboxes.currentValue && this.doLoadChildren) {
            this.checkboxes.forEach(checkbox => {
                checkbox.ariaId = `${checkboxCounter}`;
                checkboxCounter ++;
                if (checkbox.children && checkbox.children.length > 0) {
                    this.setParentState(checkbox);
                }
            });
            if (this.shouldSort) {
                this.checkboxes = this.sortCheckboxes(this.checkboxes);
            }
            this.updateSelectionCount();
            this.loadChildren(changes.checkboxes.currentValue);
        }

        if (changes.doLoadChildren && changes.doLoadChildren.currentValue === true && !changes.doLoadChildren.previousValue) {
            this.loadChildren(this.checkboxes);
        }
    }

    toggleSelectAll() {
        this.isAllSelected = !this.isAllSelected;
        this.updateSelectionCount();
        this.setSelectionForAll(this.checkboxes);
        this.emitSelectionChanged();
    }

    toggleSelection(isSelected: boolean, checkbox: ControlModel) {
        if (!!checkbox && this.type === 'radio') {
            this.checkboxes.forEach(radio => {
                if (radio.value !== checkbox.value) {
                    radio.isSelected = false;
                }
            });
        }
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
        if (this.isCountVisible) {
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
        this.checkboxes.forEach(checkbox => this.updateSelectedValues(checkbox, selectedValues));
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
        if (!this.isChildren) {
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

    private loadChildren(checkboxes: ControlModel[]) {
        if (this.shouldSort) {
            checkboxes = this.sortCheckboxes(checkboxes);
        }
        if (this.isAsync) {
            for (const checkbox of checkboxes) {
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

    private sortCheckboxes(checkboxes: ControlModel[]): ControlModel[] {
        if (checkboxes && checkboxes.length > 0) {
            this.translate.stream(checkboxes.map(checkbox => checkbox.label || '')).subscribe((labels => {
                checkboxes = checkboxes.map(checkbox => {
                    checkbox.label = labels[checkbox.label];
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
