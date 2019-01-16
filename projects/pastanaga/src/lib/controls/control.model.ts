export class ControlModel {
    label = '';
    subLabel?: string;
    value?: string;
    id?: string;
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
    areChildrenExpanded = false;
}
