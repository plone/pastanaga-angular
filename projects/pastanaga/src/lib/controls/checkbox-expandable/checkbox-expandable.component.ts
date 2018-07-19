import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ControlModel } from '../control.model';

let nextExpandButtonId = 0;
let nextFieldsetGroupId = 0;

const ANIMATION_DURATION = 200;
const animationStates = {
    collapsed: 'collapsed',
    expanded: 'expanded',
};

/**
 * pa-checkbox-expandable is a component composed by a parent checkbox and the list of its children, with a button
 * to expand/collapse children group.
 * This component is used in checkbox-group and it is not meant to be used by itself.
 */
@Component({
    selector: 'pa-checkbox-expandable',
    templateUrl: './checkbox-expandable.component.html',
    styleUrls: ['./checkbox-expandable.component.scss'],
    animations: [
        trigger('toggleHeight', [
            state(animationStates.collapsed, style({
                height: '0',
                opacity: '0',
            })),
            state(animationStates.expanded, style({
                height: '*',
                opacity: '1',
            })),
            transition(`${animationStates.collapsed} => ${animationStates.expanded}`, animate(`${ANIMATION_DURATION}ms ease-in`)),
            transition(`${animationStates.expanded} => ${animationStates.collapsed}`, animate(`${ANIMATION_DURATION}ms ease-out`))
        ]),
    ],
})
export class CheckboxExpandableComponent implements OnInit, OnChanges {
    @Input() control: ControlModel;
    @Input() type: string;
    @Input() sublistLegend: string;

    @Output() selection: EventEmitter<string[]> = new EventEmitter();

    expandButtonId = `o-expand-checkbox-${nextExpandButtonId++}`;
    fieldsetGroupId = `fieldset-group-checkbox-${nextFieldsetGroupId++}`;

    isCollapsed = true;
    isHidden = true;
    collapsedState = animationStates.collapsed;

    ngOnInit() {
        if (this.control.children.every(child => child.isDisabled)) {
            this.control.isDisabled = true;
        } else if (this.control.isDisabled) {
            this.control.children.forEach(child => child.isDisabled = true);
        }

        this.control.isIndeterminate = this.getIndeterminate();
    }

    ngOnChanges(changes) {
        if (changes.control && changes.control.currentValue) {
            this.control.children.sort((a, b) => {
                const aLabel = a.label || '';
                const bLabel = b.label || '';
                return aLabel.toLocaleLowerCase().localeCompare(bLabel.toLowerCase());
            });
        }
    }

    toggleCollapsedState() {
        if (this.isCollapsed) {
            this.isHidden = false;
        }
        this.isCollapsed = !this.isCollapsed;
        this.collapsedState = this.isCollapsed ? animationStates.collapsed : animationStates.expanded;

        // hide sublist from the dom after animation is done to prevent focus by tab when collapsed
        if (this.isCollapsed) {
            setTimeout(() => {
                this.isHidden = true;
            }, ANIMATION_DURATION + 10);
        }
    }

    updateControlSelection() {
        this.control.children.forEach(child => child.isSelected = this.control.isSelected);
        this.updateSelection(true);
    }

    updateChildSelection() {
        this.control.isIndeterminate = this.getIndeterminate();

        // unselect parent if all children are unselected, select parent if all children are selected
        if (this.control.children.every(child => !child.isSelected)) {
            this.control.isSelected = false;
        } else if (this.control.children.every(child => child.isSelected)) {
            this.control.isSelected = true;
        }

        this.updateSelection(true);
    }

    private getIndeterminate(): boolean {
        return this.control.children.some(child => child.isSelected) &&
            !this.control.children.every(child => child.isSelected);
    }

    private updateSelection(shouldIncludeParent: boolean) {
        const values = this.control.children
                            .filter(child => child.isSelected)
                            .map(child => child.value);

        if (shouldIncludeParent && !!this.control.value) {
            values.push(this.control.value);
        }
        this.selection.emit(values);
    }
}
