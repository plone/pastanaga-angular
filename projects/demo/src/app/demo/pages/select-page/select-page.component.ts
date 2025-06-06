import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '@guillotinaweb/pastanaga-angular';

@Component({
  templateUrl: './select-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SelectPageComponent {
  model = '';
  selectedTab = 'standalone';

  multipleSelectControl = new FormControl<string>('user1,audio3');

  optionsWithDescription: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
    new OptionModel({ id: 'desc1', label: 'Option 1', help: 'Description 1', value: 'desc1' }),
    new OptionModel({
      id: 'desc2',
      label: 'Another option with description',
      help: 'Some description to be displayed',
      value: 'desc2',
    }),
    new OptionModel({
      id: 'desc3',
      label: 'Super long option with description showing an ellipsis',
      help: 'Another description to be displayed which is also really really long and should has an ellipsis as well',
      value: 'desc3',
    }),
  ];

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

  multipleOptions: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
    new OptionHeaderModel({ id: 'audio', label: 'Audio' }),
    new OptionModel({ id: 'file1', label: 'User 1', value: 'user1' }),
    new OptionModel({ id: 'file2', label: 'Audio 2', value: 'audio2', icon: 'audio', disabled: true }),
    new OptionModel({ id: 'file3', label: 'Audio 3', value: 'audio3', icon: 'audio' }),
    new OptionHeaderModel({ id: 'image', label: 'Images' }),
    new OptionModel({ id: 'file4', label: 'Image 1', value: 'image1', icon: 'image' }),
    new OptionModel({ id: 'file5', label: 'Image 2', value: 'image2', icon: 'image' }),
    new OptionSeparator(),
    new OptionModel({
      id: 'danger',
      label: 'Dangerous option',
      value: 'danger',
      icon: 'warning',
      destructive: true,
    }),
  ];
  multipleSelection = '';

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
