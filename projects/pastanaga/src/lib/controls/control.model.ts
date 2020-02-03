export interface IControlModel {
    id: string;
    label: string;
    subLabel?: string;
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
    totalChildren?: number;
    selectedChildren?: number;
}

export class ControlModel {
    id = '';
    label = '';
    subLabel?: string;
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

    children: ControlModel[] = [];
    totalChildren?: number;
    selectedChildren?: number;

    constructor(data: IControlModel) {
        this.id = data.id || '';
        this.label = data.label || '';
        this.subLabel = data.subLabel || '';
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

        this.children = data.children || [];
        if (typeof data.totalChildren === 'number') {
            this.totalChildren = data.totalChildren;
        }
        if (typeof data.selectedChildren === 'number') {
            this.selectedChildren = data.selectedChildren;
        }
    }
}
