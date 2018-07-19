export class ControlModel {
    label: string;
    value?: string;
    id?: string;
    help?: string;
    icon?: string;
    isSelected?: boolean;
    isDisabled?: boolean;
    isFiltered?: boolean;
    isIndeterminate?: boolean;

    children?: ControlModel[];
}
