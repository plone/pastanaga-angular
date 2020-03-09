import { ControlModel } from 'pastanaga-angular';

export const sortCheckboxes = (checkboxes: ControlModel[]): ControlModel[] => {
    return checkboxes.sort((a, b) => {
        const aLabel = a.label || '';
        const bLabel = b.label || '';
        return aLabel.toLocaleLowerCase().localeCompare(bLabel.toLocaleLowerCase());
    });
};

export const getCheckboxValue = (checkbox: ControlModel): string => {
    return checkbox.value || checkbox.id;
};
