export class ToggleModel {
    id?: string;
    label = '';
    isSelected = false;
    help?: string;
    imageUrl?: string;
}

export class ToggleDivider {
    hasDivider = false;
    isFirst = true;
    isLast = false;
}
