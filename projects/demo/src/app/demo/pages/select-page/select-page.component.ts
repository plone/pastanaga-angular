import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '@guillotinaweb/pastanaga-angular';

@Component({
    templateUrl: './select-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {
    model = '';
    selectedTab = 'standalone';
    dropdownContent: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
        new OptionHeaderModel({ id: 'audio', label: 'Audio' }),
        new OptionModel({ id: 'file1', label: 'User 1', value: 'user1' }),
        new OptionModel({ id: 'file2', label: 'Audio 2', value: 'audio2', icon: 'audio', disabled: true }),
        new OptionModel({ id: 'file3', label: 'Audio 3', value: 'audio3', icon: 'audio' }),
        new OptionHeaderModel({ id: 'image', label: 'Images' }),
        new OptionModel({ id: 'file4', label: 'Image 1', value: 'image1', icon: 'image' }),
        new OptionModel({ id: 'file5', label: 'Image 2', value: 'image2', icon: 'image' }),
        new OptionSeparator(),
        new OptionModel({
            id: 'delete',
            label: 'Delete',
            value: 'delete',
            icon: 'trash',
            dontCloseOnSelect: true,
            destructive: true,
        }),
    ];

    baseControlModelsUsage = `models: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
    new OptionHeaderModel({ label: 'Header' }),
    new OptionModel({ label: 'Option 1', value: 'option1' }),
    new OptionSeparator(),
];
<pa-select [options]="models"></pa-select>`;

    paOptionUsage = `<pa-select>
    <pa-option-header>Header</pa-option-header>
    <pa-option value="option1">Option 1</pa-option>
    <pa-separator></pa-separator>
</pa-select>`;
    standaloneBasicCode = `<pa-select label="Select an option"
    [value]="preselected"
    (valueChange)="doSomething()">
        <pa-option value="option1">Option 1</pa-option>
        <pa-option value="option2">Option 2</pa-option>
</pa-select>`;

    standaloneBasicCodeOptionsTs = `options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
    new OptionHeaderModel({ id: 'audio', label: 'Audio' }),
    new OptionModel({ id: 'file1', label: 'Audio 1', value: 'audio1', icon: 'audio' }),
    new OptionModel({ id: 'file2', label: 'Audio 2', value: 'audio2', icon: 'audio', disabled: true }),
    new OptionModel({ id: 'file3', label: 'Audio 3', value: 'audio3', icon: 'audio', selected: true }),
    new OptionHeaderModel({ id: 'image', label: 'Images' }),
    new OptionModel({ id: 'file4', label: 'Image 1', value: 'image1', icon: 'image' }),
    new OptionModel({ id: 'file5', label: 'Image 2', value: 'image2', icon: 'image' }),
    new OptionSeparator(),
    new OptionModel({
        id: 'delete',
        label: 'Delete',
        value: 'delete',
        icon: 'trash',
        dontCloseOnSelect: true,
        destructive: true,
    }),
];`;
    standaloneBasicCodeOptionsHtml = `<pa-select label="Select an option"
    [options]="options"
    (valueChange)="doSomething()"></pa-select>`;

    standaloneFullCode = `<pa-select label="Select an option"
    placeholder="The placeholder"
    required
    id="myId"
    name="fieldName"
    help="A displayed help text"
    readonly="false"
    [hasFocus]="hasFocus"
    [disabled]="disabledStatus"
    [showAllErrors]="false"
    [errorMessage]="customErrorMessage"
    [errorMessages]="theErrorMessages"
    [value]="preselected"
    (valueChange)="doSomething()"
    (expanded)="doSomethingElse()">
        <pa-option-header>First option Group</pa-option-header>
        <pa-option value="option1">Option 1</pa-option>
        <pa-option value="option2">Option 2</pa-option>
        <pa-option-header>Second option Group</pa-option-header>
        <pa-option value="option3">Option 3</pa-option>
        <pa-option value="option4">Option 4</pa-option>
</pa-select>`;

    ngModelBasicCode = `<pa-select label="Select an option" [(ngModel)]="selectedOptionValue">
    <pa-option value="option1">Option 1</pa-option>
    <pa-option value="option2">Option 2</pa-option>
</pa-select>`;

    formControlCodeTs = `formControl = new FormControl('option2');
options: OptionModel[] = [
    new OptionModel({ id: '1', label: 'Option 1', value: 'option1'}),
    new OptionModel({ id: '2', label: 'Option 2', value: 'option2'}),
];
...
this.formControl.valueChanges.subscribe((value) => {
    // do something...
});
`;

    formControlCodeHtml = `<pa-select label="Select an option"
    [formControl]="formControl"
    [options]="options"></pa-select>`;

    formControlNameCodeTs = `formGroup = new FormGroup({
        selectOne: new FormControl('option2'),
});
options: OptionModel[] = [
        new OptionModel({ id: '1', label: 'Option 1', value: 'option1'}),
        new OptionModel({ id: '2', label: 'Option 2', value: 'option2'}),
];
onSubmit() {
     // do something...
}`;

    formControlNameCodeHtml = `<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
    <pa-select label="Pick one"
        formControlName="selectOne"
        [options]="options"></pa-select>
</form>`;
}
