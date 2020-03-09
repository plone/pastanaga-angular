import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ChangeDetectionStrategy,
    ChangeDetectorRef, ViewChildren, QueryList, OnChanges, SimpleChanges
} from '@angular/core';
import { ControlModel } from '../control.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '../../translate/translate.pipe';
import { markForCheck } from '../../common/utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { BadgeComponent } from '../../badge/badge.component';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getCheckboxValue, sortCheckboxes } from '../checkbox.utils';

let nextId = 0;

export enum CheckboxTreeMode {
    categorized = 'categorized',
    nested = 'nested',
    fileSystem = 'fileSystem',
}

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
export class CheckboxTreeComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() id?: string;
    @Input() checkboxes?: ControlModel[];
    @Input() getChildren?: (control: ControlModel) => Observable<ControlModel[]>;
    @Input() doLoadChildren = true;
    @Input() set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    @Input() set shouldSort(value) { this._shouldSort = coerceBooleanProperty(value); }
    @Input() set badgeVisible(value) { this._badgeVisible = coerceBooleanProperty(value); }
    @Input() set selectAllVisible(value) { this._selectAllVisible = coerceBooleanProperty(value); }
    @Input() set countVisible(value) {
        this._countVisible = coerceBooleanProperty(value);
        this.updateSelectionCount();
    }

    /**
     * Mode defined checkbox tree global behaviour:
     * - categorized (default):
     *   - emitted selection contains only selected leaf
     *   - selecting a parent automatically select its children
     *   - selecting all children automatically select the parent
     * - nested:
     *   - emitted selection contains all selected nodes
     *   - selecting a parent automatically select its children
     *   - selecting all children automatically select the parent
     * - fileSystem: a parent can have some inner content (like a folder can contain sub-folders but also some files)
     *   - emitted selection contains all selected nodes
     *   - selecting a parent does not select its children
     *   - selecting all children does not select the parent
     *   - a button allow to select/unselect all direct children of node
     */
    @Input() mode: CheckboxTreeMode = CheckboxTreeMode.categorized;

    // not meant to be used outside
    @Input() _isChildren = false;

    @Output() selection: EventEmitter<string[]> = new EventEmitter();
    @Output() childrenSelection: EventEmitter<{parentId: string, isSelected: boolean}> = new EventEmitter();
    @Output() allSelected: EventEmitter<boolean> = new EventEmitter();
    @Output() updatedTree: EventEmitter<ControlModel[]> = new EventEmitter<ControlModel[]>();
    @Output() isLoadingChildren: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChildren(CheckboxComponent) checkboxComponents?: QueryList<CheckboxComponent>;
    @ViewChildren(BadgeComponent) badgeComponents?: QueryList<BadgeComponent>;

    _checkboxes: ControlModel[] = [];
    _shouldSort = true;
    _badgeVisible = true;
    _selectAllVisible = true;
    _countVisible = false;
    _disabled = false;

    onChange: any;
    onTouched: any;

    modes = CheckboxTreeMode;
    isAllSelected = false;
    isAsync = false;
    totalCount = 0;
    totalSelected = 0;

    fileSystemButtonVisibility: {[checkboxId: string]: boolean} = {};
    _isLoadingChildren = false;
    _disableToggleChildren = false;

    constructor(
        private translate: TranslatePipe,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.id = !this.id ? `fieldset-checkbox-tree-${nextId++}` : `${this.id}-checkbox-tree`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.getChildren) {
            this.isAsync = typeof this.getChildren === 'function';
        }

        if (changes.checkboxes && !!changes.checkboxes.currentValue) {
            const translatedCheckboxes = changes.checkboxes.currentValue.map(checkbox => new ControlModel({
                ...checkbox,
                label: this.translate.transform(checkbox.label || ''),
                selectedChildren: this.getSelectedChildrenCount(checkbox),
            }));
            this._checkboxes = this._shouldSort ? sortCheckboxes(translatedCheckboxes) : translatedCheckboxes;
            if (this.doLoadChildren) {
                this.loadChildren();
            }
            this.updateSelectionCount();
            this.updateAllSelected();
            this.computeCheckboxSizes();
            this.emitSelectionChanged();
            markForCheck(this.cdr);
        }

        if (changes.doLoadChildren && changes.doLoadChildren.currentValue === true && !changes.doLoadChildren.previousValue) {
            this.loadChildren();
        }
    }

    writeValue(value: any) {
        if (!!this._checkboxes) {
            this._checkboxes = this._checkboxes.map(checkbox => new ControlModel({...checkbox, isSelected: value === checkbox.value}));
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
            const updatedCheckbox = new ControlModel({
                ...checkbox,
                isSelected: checkbox.isDisabled ? checkbox.isSelected : this.isAllSelected,
                isIndeterminate: false,
                children: this.getUpdatedChildrenSelection(this.isAllSelected, checkbox),
            });
            updatedCheckbox.selectedChildren = this.getSelectedChildrenCount(updatedCheckbox);
            return updatedCheckbox;
        });
        this.updateSelectionCount();
        this.emitSelectionChanged();
    }

    toggleSelection(isSelected: boolean, checkbox: ControlModel) {
        checkbox.isSelected = isSelected;
        // when file system, we automatically select children, but we don't automatically unselect them
        const shouldUpdateChildren = !!checkbox.children && (isSelected || this.mode !== CheckboxTreeMode.fileSystem);
        if (shouldUpdateChildren) {
            checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
            checkbox.selectedChildren = this.getSelectedChildrenCount(checkbox);
            markForCheck(this.cdr);
        }
        checkbox.isIndeterminate = this.mode !== CheckboxTreeMode.fileSystem ? false : this.getIndeterminateForFileSystem(checkbox);
        this.updateAllSelected();
        this.emitSelectionChanged();
    }

    toggleChildrenSelection(checkbox: ControlModel) {
        const isSelected = (checkbox.selectedChildren || 0) < (checkbox.totalChildren || 0);
        checkbox.children = this.getUpdatedChildrenSelection(isSelected, checkbox);
        checkbox.selectedChildren = this.getSelectedChildrenCount(checkbox);
        checkbox.isIndeterminate = this.getIndeterminateForFileSystem(checkbox);
        markForCheck(this.cdr);
        this.emitSelectionChanged();
        this.childrenSelection.emit({parentId: checkbox.id, isSelected});
    }

    private getUpdatedChildrenSelection(isSelected: boolean, checkbox: ControlModel): ControlModel[] | undefined {
        if (!!checkbox.children) {
            return checkbox.children.map(child => {
                if (!!child.children) {
                    child.children = this.getUpdatedChildrenSelection(isSelected, child);
                    child.selectedChildren = this.getSelectedChildrenCount(child);
                }
                return new ControlModel({...child, isSelected, isIndeterminate: false});
            });
        }
    }

    setParentState(childrenTree: ControlModel[], parent: ControlModel) {
        // copy children state without changing object ref to prevent having an infinite loop of children/parent change detection
        if (!!parent.children) {
            parent.children.forEach((child, i) => {
                if (!!parent.children && childrenTree[i]) {
                    parent.children[i] = new ControlModel({...childrenTree[i]});
                }
            });
        }
        if (this.mode === CheckboxTreeMode.fileSystem) {
            parent.isIndeterminate = this.getIndeterminateForFileSystem(parent);
        } else {
            if (childrenTree.every(child => child.isSelected && !child.isIndeterminate)) {
                parent.isSelected = true;
                parent.isIndeterminate = false;
            } else {
                parent.isIndeterminate = childrenTree.some(child => child.isSelected || child.isIndeterminate);
                if (parent.isIndeterminate || childrenTree.every(child => !child.isSelected)) {
                    parent.isSelected = false;
                }
            }
        }
        parent.selectedChildren = this.getSelectedChildrenCount(parent);

        this.updateAllSelected();
        this.emitSelectionChanged();
        markForCheck(this.cdr);
    }

    private getIndeterminateForFileSystem(parent: ControlModel) {
        const children = parent.children || [];
        const allChildrenSelected = children.every(child => child.isSelected);
        const allChildrenUnSelected = children.every(child => !child.isSelected);
        return children.some(child => child.isIndeterminate)
            || (parent.isSelected && !allChildrenSelected && !allChildrenUnSelected)
            || (!parent.isSelected && children.some(child => child.isSelected));
    }

    toggleCheckbox(checkbox: ControlModel) {
        checkbox.isExpanded = !checkbox.isExpanded;
        this.updatedTree.emit(this._checkboxes);
        markForCheck(this.cdr);
    }

    private getSelectedChildrenCount(checkbox: ControlModel): number {
        return !!checkbox.children ? checkbox.children.filter(child => child.isSelected).length : 0;
    }

    private updateSelectionCount() {
        if (this._countVisible && !!this._checkboxes) {
            this.totalCount = 0;
            this.totalSelected = 0;
            this.countThemAll(this._checkboxes);
            markForCheck(this.cdr);
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
        this.updatedTree.emit(this._checkboxes);
    }

    private getSelectedValues(): string[] {
        const selectedValues: string[] = [];
        if (!!this._checkboxes) {
            this._checkboxes.forEach(checkbox => this.updateSelectedValues(checkbox, selectedValues));
        }
        return selectedValues;
    }

    private updateSelectedValues(checkbox: ControlModel, selectedValues: string[]) {
        // by default selection contains only leaf (categorized tree)
        // if nested or fileSystem tree, selection contains all selected nodes
        const isCategorized = this.mode === CheckboxTreeMode.categorized;
        if (checkbox.isSelected && (!isCategorized || !checkbox.children || checkbox.children.length === 0)) {
            selectedValues.push(getCheckboxValue(checkbox));
        }
        if (!!checkbox.children) {
            checkbox.children.forEach(child => this.updateSelectedValues(child, selectedValues));
        }
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

    private loadChildren() {
        if (this.isAsync && !!this.getChildren && !this._isLoadingChildren) {
            this._isLoadingChildren = true;
            this.isLoadingChildren.emit(this._isLoadingChildren);
            const requests: Observable<ControlModel[]>[] = [];
            for (const checkbox of this._checkboxes) {
                if (!!checkbox.children) {
                    continue;
                }

                requests.push(this.getChildren(checkbox).pipe(tap(children => {
                    let selectedChildren = 0;
                    checkbox.children = children.map(child => {
                        const updatedChild = new ControlModel({
                            ...child,
                            label: this.translate.transform(child.label || ''),
                            isSelected: checkbox.isSelected,
                        });
                        if (updatedChild.isSelected) {
                            selectedChildren++;
                        }
                        return updatedChild;
                    });
                    checkbox.totalChildren = children.length;
                    checkbox.selectedChildren = selectedChildren;
                    markForCheck(this.cdr);
                })));
            }

            if (requests.length === 0) {
                this._isLoadingChildren = false;
                this.isLoadingChildren.emit(this._isLoadingChildren);
            } else {
                forkJoin(requests).subscribe(() => {
                    markForCheck(this.cdr);
                    this.emitSelectionChanged();
                    this._isLoadingChildren = false;
                    this.isLoadingChildren.emit(this._isLoadingChildren);
                });
            }
        }
        this.updateSelectionCount();
    }

    onMouseOver(checkbox: ControlModel) {
        if (this.mode === CheckboxTreeMode.fileSystem) {
            this.fileSystemButtonVisibility[checkbox.id] = true;
        }
    }

    onMouseLeave(checkbox: ControlModel) {
        if (this.mode === CheckboxTreeMode.fileSystem) {
            const children = checkbox.children || [];
            // keep button visible when checkbox is selected while its children are not
            this.fileSystemButtonVisibility[checkbox.id] = checkbox.isSelected && children.every(child => !child.isSelected);
        }
    }

    private computeCheckboxSizes() {
        setTimeout(() => {
            // FIXME checkbox size wrong after selecting all
            if (this._badgeVisible && !!this.checkboxComponents) {
                const badges = this.badgeComponents || [] as BadgeComponent[];
                this.checkboxComponents.forEach(checkboxComponent => {
                    const id = checkboxComponent.id;
                    const checkbox = this._checkboxes.find(item => item.id === id);
                    if (!!checkbox && !!checkbox.totalChildren) {
                        const badge = badges.find(b => b.id === id);
                        if (!!badge) {
                            const badgeWidth = badge.elementRef.nativeElement.getBoundingClientRect().width;
                            const extraWidth = this.mode === CheckboxTreeMode.fileSystem ? badgeWidth + 124 : badgeWidth;
                            checkboxComponent.setLabelMaxWidth(extraWidth);
                        }
                    }
                });
            }
        }, 100);
    }
}
