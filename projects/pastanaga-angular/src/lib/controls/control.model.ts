export enum ControlType {
    checkbox = 'checkbox',
    radio = 'radio',
    option = 'option',
    header = 'header',
    separator = 'separator',
}

export interface IControlModel {
    id: string;
    type?: ControlType;
    label: string;
    value: string;
    help?: string;
    glyph?: string;
    selected?: boolean;
    disabled?: boolean;
    filtered?: boolean;
}

export interface IOptionModel extends IControlModel {
    destructive?: boolean;
    dontCloseOnSelect?: boolean;
}

export class BaseControlModel {
    type: ControlType;

    constructor(type: ControlType) {
        this.type = type;
    }
}

export class ControlModel extends BaseControlModel {
    id: string;
    label: string;
    value: string;
    help?: string;
    glyph?: string;
    selected: boolean;
    disabled: boolean;
    filtered: boolean;

    constructor(data: IControlModel) {
        super(data.type || ControlType.checkbox);
        this.id = data.id;
        this.label = data.label;
        this.value = data.value;
        this.help = data.help || '';
        this.glyph = data.glyph || '';
        this.selected = data.selected || false;
        this.disabled = data.disabled || false;
        this.filtered = data.filtered || false;
    }
}

export class OptionModel extends ControlModel {
    destructive: boolean;
    dontCloseOnSelect: boolean;

    constructor(data: IOptionModel) {
        super({ ...data, type: ControlType.option });
        this.destructive = data.destructive || false;
        this.dontCloseOnSelect = data.dontCloseOnSelect || false;
    }
}

export class OptionHeaderModel extends BaseControlModel {
    id: string;
    label: string;

    constructor(data: { id: string; label: string }) {
        super(ControlType.header);
        this.id = data.id;
        this.label = data.label;
    }
}

export class OptionSeparator extends BaseControlModel {
    constructor() {
        super(ControlType.separator);
    }
}
