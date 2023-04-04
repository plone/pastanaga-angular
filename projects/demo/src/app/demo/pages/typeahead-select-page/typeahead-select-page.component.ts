import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COUNTRIES } from './countries';
import { OptionModel, OptionType } from '@guillotinaweb/pastanaga-angular';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pa-demo-typeahead-select-page',
    templateUrl: './typeahead-select-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeaheadSelectPageComponent {
    countries: { code: string; name: string }[] = Object.entries(COUNTRIES)
        .map(([code, name]) => ({ code, name }))
        .sort((a, b) => a.name.localeCompare(b.name));

    countryOptions: OptionType[] = this.countries.map(
        (country) =>
            new OptionModel({
                id: country.code,
                label: country.name,
                value: country.code,
            }),
    );

    formGroup = new FormGroup({
        country: new FormControl<string>('FR'),
    });

    codeNgContent = `<pa-typeahead-select label="Typeahead">
    <pa-option
        *ngFor="let country of countries"
        [value]="country.code">
        {{ country.name }}
    </pa-option>
</pa-typeahead-select>`;

    codeOptions = `<pa-typeahead-select label="Typeahead" [options]="countryOptions"></pa-typeahead-select>`;
    codeFormGroup = `
<form [formGroup]="formGroup">
    <pa-typeahead-select label="Typeahead"
                         formControlName="country"
                         [options]="countryOptions"
    ></pa-typeahead-select>
</form>`;
}
