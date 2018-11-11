export class ControlModel {
    label: string;
    subLabel?: string;
    value?: string;
    id?: string;
    ariaId?: string;
    help?: string;
    icon?: string;
    isSelected?: boolean;
    isDisabled?: boolean;
    isFiltered?: boolean;
    isIndeterminate?: boolean;
    isExpanded?: boolean;
    isHidden?: boolean;

    children?: ControlModel[];
    totalChildren?: number;
    selectedChildren?: number;
    areChildrenExpanded?: boolean;
}
