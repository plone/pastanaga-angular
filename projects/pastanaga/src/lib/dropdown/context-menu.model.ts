export class ContextMenuItem {
    id?: string;
    trackingID?: string;
    icon?: string;
    text = '';
    multi = false;
    isDisabled = false;
    isHidden = false;
    hasSeparator = false;
    subLevelItems?: ContextMenuItem[];
    checkboxMode = false;
    isSelected = false;
    mode: 'default' | 'primary' | 'secondary' | 'destructive' = 'secondary';
    constructor(data) {
        this.id = data.id;
        this.trackingID = data.trackingID;
        this.icon = data.icon;
        this.text = data.text ? data.text : this.text;
        this.multi = data.multi ? data.multi : this.multi;
        this.isDisabled = data.isDisabled ? data.isDisabled : this.isDisabled;
        this.isHidden = data.isHidden ? data.isHidden : this.isHidden;
        this.hasSeparator = data.hasSeparator ? data.hasSeparator : this.hasSeparator;
        this.checkboxMode = data.checkboxMode ? data.checkboxMode : this.checkboxMode;
        this.isSelected = data.isSelected ? data.isSelected : this.isSelected;
        this.mode = data.mode ? data.mode : this.mode;
        this.subLevelItems = data.subLevelItems ? data.subLevelItems : this.subLevelItems;
    }
}
