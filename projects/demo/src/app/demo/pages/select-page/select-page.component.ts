import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './select-page.component.html',
    styleUrls: ['./select-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {
    selectedValue1 = 'user2';
    selectedValue2 = '';
    options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
        new OptionHeaderModel({ id: 'audio', label: 'Audio' }),
        new OptionModel({ id: 'file1', label: 'Audio 1', value: 'audio1', glyph: 'audio' }),
        new OptionModel({ id: 'file2', label: 'Audio 2', value: 'audio2', glyph: 'audio', disabled: true }),
        new OptionModel({ id: 'file3', label: 'Audio 3', value: 'audio3', glyph: 'audio', selected: true }),
        new OptionHeaderModel({ id: 'image', label: 'Images' }),
        new OptionModel({ id: 'file4', label: 'Image 1', value: 'image1', glyph: 'image' }),
        new OptionModel({ id: 'file5', label: 'Image 2', value: 'image2', glyph: 'image' }),
        new OptionSeparator(),
        new OptionModel({
            id: 'delete',
            label: 'Delete',
            value: 'delete',
            glyph: 'delete',
            dontCloseOnSelect: true,
            destructive: true,
        }),
    ];
    disabledState = false;
    readOnlyState = false;

    exampleInTemplate = `<pa-select label="Select with options passed through template"
           placeholder="Placeholder"
           [value]="selectedValue1"
           [disabled]="disabledState"
           [readonly]="readOnlyState"
>
    <pa-option-header>Users</pa-option-header>
    <pa-option (selectOption)="selectedValue1 = 'User 1'">User 1</pa-option>
    <pa-option (selectOption)="selectedValue1 = 'User 2'">User 2</pa-option>
    <pa-option (selectOption)="selectedValue1 = 'User 3'">User 3</pa-option>
    <pa-option-header>Groups</pa-option-header>
    <pa-option (selectOption)="selectedValue1 = 'Group 1'">Group 1</pa-option>
    <pa-option (selectOption)="selectedValue1 = 'Group 2'">Group 2</pa-option>
    <pa-option (selectOption)="selectedValue1 = 'Group 3'">Group 3</pa-option>
</pa-select>`;

    exampleWithInputHtml = `<pa-select label="Select with options passed as parameter"
           placeholder="Placeholder"
           [options]="options"
           [value]="selectedValue2"
           [disabled]="disabledState"
           [readonly]="readOnlyState"
           (selectOption)="onSelect($event)"
></pa-select>`;
    exampleWithInputTs = `options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
    new OptionHeaderModel({id: 'audio', label: 'Audio'}),
    new OptionModel({id: 'file1', label: 'Audio 1', value: 'audio1', glyph: 'audio'}),
    new OptionModel({id: 'file2', label: 'Audio 2', value: 'audio2', glyph: 'audio', disabled: true}),
    new OptionModel({id: 'file3', label: 'Audio 3', value: 'audio3', glyph: 'audio'}),
    new OptionHeaderModel({id: 'image', label: 'Images'}),
    new OptionModel({id: 'image1', label: 'Image 1', value: 'image1', glyph: 'image'}),
    new OptionModel({id: 'image2', label: 'Image 2', value: 'image2', glyph: 'image'}),
    new OptionSeparator(),
    new OptionModel({
        id: 'delete',
        label: 'Delete',
        value: 'delete',
        glyph: 'delete',
        dontCloseOnSelect: true,
        destructive: true
    }),
];`;
}
