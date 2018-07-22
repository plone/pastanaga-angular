import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlModel } from '../control.model';

let nextId = 0;

/**
 * Usage:
 *  - take a list of ControlModel on Input, each of them will be updated by two-way data binding.
 *  So at any moment you can know what is selected by parsing the list of ControlModel you passed.
 *  - can be of type checkbox or radio (checkbox by default)
 *  - can display a badge with the selection number and the total number (hidden by default)
 *  - this selection/total count can be external (used by paginated-checkboxes)
 *  - select all button can be hidden (displayed by default)
 *  - the list of controls can be sorted alphabetically (sorted by default)
 *  - if no id is given for this group, an id will be generated
 *  - if no name is given for this group, the id will be used as name
 *
 *  - emit two events:
 *      - selection emit a list of strings corresponding to the value of each selected control
 *      - selectAll emit isAllSelected as a boolean
 */
@Component({
    selector: 'pa-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent implements OnInit, OnChanges {
    @Input() id: string;
    @Input() name: string;
    @Input() checkboxes: ControlModel[];
    @Input() type = 'checkbox';
    @Input() isBadgeVisible: boolean;
    @Input() total: number;
    @Input() totalSelected: number;
    @Input() isCountExternal: boolean;
    @Input() shouldHideSelectAll: boolean;
    @Input() shouldSort = true;

    @Output() selection: EventEmitter<string[]> = new EventEmitter();
    @Output() selectAll: EventEmitter<boolean> = new EventEmitter();

    isAllSelected = false;

    ngOnInit() {
        this.id = this.id || `fieldset-group-checkbox-${nextId++}`;
    }

    ngOnChanges(changes) {
        if (changes.checkboxes && changes.checkboxes.currentValue) {
            if (this.shouldSort) {
                this.checkboxes.sort((a, b) => {
                    const aLabel = a.label || '';
                    const bLabel = b.label || '';
                    return aLabel.toLocaleLowerCase().localeCompare(bLabel.toLowerCase());
                });
            }

            if (!this.isCountExternal) {
                this.updateTotal();
            }
        }

        if (this.isCountExternal) {
            this.isAllSelected = this.totalSelected === this.total;
        }
    }

    updateTotal() {
        this.total = 0;
        this.totalSelected = 0;
        this.checkboxes.forEach(checkbox => {
            // parent without value doesn't count in selection nor total
            if (!!checkbox.value) {
                this.total++;
                if (checkbox.isSelected) {
                    this.totalSelected++;
                }
            }

            if (checkbox.children && checkbox.children.length) {
                this.total += checkbox.children.length;
            }

        });
    }

    updateSelection(checkbox?: ControlModel) {
        // when type radio, unselect the others
        if (!!checkbox && this.type === 'radio') {
            this.checkboxes.forEach(radio => {
                if (radio.id !== checkbox.id) {
                    radio.isSelected = false;
                }
            });
        }

        let currentSelection: string[] = [];
        this.checkboxes.forEach(parent => {
            if (!!parent.children && parent.children.length > 0) {
                parent.isIndeterminate = this.getIndeterminate(parent);
                const childSelection = parent.children
                                             .filter(child => child.isSelected)
                                             .map(child => child.value);
                currentSelection = currentSelection.concat(childSelection);
            } else if (parent.isSelected && !!parent.value) {
                currentSelection.push(parent.value);
            }
        });

        if (!this.isCountExternal) {
            this.updateTotal();
        }
        this.updateIsAllSelected();
        this.selection.emit(currentSelection);
    }

    toggleSelectAll() {
        this.isAllSelected = !this.isAllSelected;
        this.checkboxes.forEach(checkbox => {
            checkbox.isSelected = !checkbox.isDisabled && this.isAllSelected;
            checkbox.isIndeterminate = this.getIndeterminate(checkbox);

            if (checkbox.children && checkbox.children.length) {
                checkbox.children.forEach(child => {
                    child.isSelected = !checkbox.isIndeterminate && this.isAllSelected;
                });
            }
        });

        this.updateSelection();
        this.selectAll.emit(this.isAllSelected);
    }

    private getIndeterminate(control): boolean {
        return !!control.children && control.children.some(child => child.isSelected) && !control.children.every(child => child.isSelected);
    }

    private updateIsAllSelected() {
        this.isAllSelected = this.checkboxes.filter(checkbox => !checkbox.isDisabled)
                                 .every(checkbox => checkbox.isSelected && !checkbox.isIndeterminate);
    }
}
