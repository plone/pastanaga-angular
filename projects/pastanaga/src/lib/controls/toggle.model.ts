export class ToggleModel {
    id: string;
    label: string;
    isSelected: boolean;
    help?: string;
    imageUrl?: string;
}

export class ToggleDivider {
    hasDivider: boolean;
    isFirst: boolean;
    isLast: boolean;
}
