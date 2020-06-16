export interface ControlModelData {
    id: string;
    label: string;
    subLabel?: string;
    labelIcons?: LabelIcon[];
    value?: string;
    help?: string;
    icon?: string;
    isSelected?: boolean;
    isDisabled?: boolean;
    isFiltered?: boolean;
    isIndeterminate?: boolean;
    isExpanded?: boolean;
    isHidden?: boolean;
    isPrivate?: boolean;

    children?: ControlModel[];
}

export class ControlModel {
    id = '';
    label = '';
    subLabel?: string;
    labelIcons?: LabelIcon[];
    value?: string;
    help?: string;
    icon?: string;
    isSelected = false;
    isDisabled = false;
    isFiltered = false;
    isIndeterminate = false;
    isExpanded = false;
    isHidden = false;
    isPrivate = false;
    isLoadingChildren = false;

    children?: ControlModel[];
    totalChildren?: number;
    selectedChildren?: number;

    constructor(data: ControlModelData) {
        this.id = data.id || '';
        this.label = data.label || '';
        this.subLabel = data.subLabel || '';
        this.labelIcons = data.labelIcons;
        this.value = data.value || '';
        this.help = data.help || '';
        this.icon = data.icon || '';
        this.isSelected = data.isSelected || false;
        this.isDisabled = data.isDisabled || false;
        this.isFiltered = data.isFiltered || false;
        this.isIndeterminate = data.isIndeterminate || false;
        this.isExpanded = data.isExpanded || false;
        this.isHidden = data.isHidden || false;
        this.isPrivate = data.isPrivate || false;

        this.children = data.children;
        if (!!this.children) {
            this.totalChildren = this.children.length;
            this.selectedChildren = this.children.filter(child => child.isSelected).length;
        }
    }
}

export class LabelIcon {
    name: string;
    tooltip: string;

    constructor(data) {
        this.name = data.name;
        this.tooltip = data.tooltip;
    }
}
