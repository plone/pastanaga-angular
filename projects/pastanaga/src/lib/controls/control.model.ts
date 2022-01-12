import { Icon } from '../common/utils';

export interface ControlModelData {
    id: string;
    label: string;
    subLabel?: string;
    sideLabel?: string;
    labelIcons?: LabelIcon[];
    value?: string;
    help?: string;
    icon?: string | Icon;
    isSelected?: boolean;
    isDisabled?: boolean;
    isFiltered?: boolean;
    isIndeterminate?: boolean;
    isExpanded?: boolean;
    isHidden?: boolean;
    isPrivate?: boolean;
    depth?: number;

    children?: ControlModel[];
}

export class ControlModel {
    id = '';
    label = '';
    subLabel?: string;
    sideLabel?: string;
    labelIcons?: LabelIcon[];
    value?: string;
    help?: string;
    icon?: string | Icon;
    isSelected = false;
    isDisabled = false;
    isFiltered = false;
    isIndeterminate = false;
    isExpanded = false;
    isHidden = false;
    isPrivate = false;
    isLoadingChildren = false;
    depth?: number;

    children?: ControlModel[];
    totalChildren?: number;
    selectedChildren?: number;

    constructor(data: ControlModelData) {
        this.id = data.id || '';
        this.label = data.label || '';
        this.subLabel = data.subLabel || '';
        this.sideLabel = data.sideLabel || '';
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
        this.depth = data.depth;

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
