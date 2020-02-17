export interface IPasswordRule {
    id: string;
    label: string;
    regexp?: RegExp;
    length?: number;
    isValid?: boolean;
}

export class PasswordRule {
    id: string;
    label: string;
    regexp?: RegExp;
    length?: number;
    isValid: boolean;

    constructor(data: IPasswordRule) {
        this.id = data.id;
        this.label = data.label;
        this.regexp = data.regexp;
        this.length = data.length;
        this.isValid = !!data.isValid;
    }
}
