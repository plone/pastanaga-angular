import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ToggleModel, ToggleDivider } from '../toggle.model';

let nextId = 0;

@Component({
    selector: 'pa-toggle-group',
    templateUrl: './toggle-group.component.html',
    styleUrls: ['./toggle-group.component.scss'],
})
export class ToggleGroupComponent implements OnInit, OnChanges {
    @Input() id?: string;
    @Input() toggles: ToggleModel[] = [];
    @Output() onSelection: EventEmitter<ToggleModel[]> = new EventEmitter();

    isAllSelected = false;
    dividers: ToggleDivider[] = [];

    ngOnInit() {
        this.id = !this.id ? `fieldset-toggle-group-${nextId++}` : `${this.id}-fieldset-toggle-group`;
    }

    ngOnChanges(changes) {
        if (changes.toggles && changes.toggles.currentValue) {
            this.isAllSelected = this.toggles.every(toggle => toggle.isSelected);
            this.dividers = this.toggles.map((toggle, index) => {
                return {
                    hasDivider: true,
                    isFirst: index === 0,
                    isLast: index === this.toggles.length - 1
                };
            });
            this.onSelection.emit(this.toggles);
        }
    }

    toggleSelectAll() {
        this.isAllSelected = !this.isAllSelected;
        this.toggles.forEach(toggle => toggle.isSelected = this.isAllSelected);
        this.onSelection.emit(this.toggles);
    }

    toggleSelection(isSelected: boolean, toggle: ToggleModel) {
        toggle.isSelected = isSelected;
        this.onSelection.emit(this.toggles);
    }
}
