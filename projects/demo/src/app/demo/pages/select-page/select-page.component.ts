import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../../../../pastanaga-angular/src';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    templateUrl: './select-page.component.html',
    styleUrls: ['./select-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent implements OnInit, OnDestroy {
    terminator: Subject<void> = new Subject<void>();

    selectedTab = 'standalone';
    valueChange?: any;
    expandedEvent?: any;
    ngModelChangeEvent?: any;
    formControlValueChangeEvent?: any;
    formControlStatusChangeEvent?: any;
    formGroupValueChangeEvent?: any;
    formGroupStatusChangeEvent?: any;

    formControl1 = new FormControl('user2');
    formControl2 = new FormControl();
    formControl3 = new FormControl();

    formGroup = new FormGroup({
        select1: new FormControl('user2'),
        select2: new FormControl(),
        select3: new FormControl(),
    });

    formGroupValue?: any;

    errorMessages = {
        required: 'this is required',
        pattern: 'regex test failed, should match user'
    };
    pattern = new RegExp('.?user.?');
    selectedValue1 = 'user2';
    selectedValue2 = '';
    selectedValue3 = '';
    firstFocused = false;
    options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [
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
            icon: 'delete',
            dontCloseOnSelect: true,
            destructive: true,
        }),
    ];
    disabledState = false;
    readOnlyState = false;

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
        icon: 'delete',
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
    maxlength="10"
    id="myId"
    name="fieldName"
    help="A displayed help text"
    readonly="false"
    [hasFocus]="hasFocus"
    [disabled]="disabledStatus"
    [showAllErrors]="false"
    [errorMessage]="customErrorMessage"
    [errorMessages]="theErrorMessages"
    [updateValidator]="updateValidatorSubject"
    [describedBy]="theIdOfTheDescribingElement"
    [suggestionMode]="true"
    [value]="preselected"
    [pattern]="myRegexPattern"
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

    ngOnInit() {
        this.formControl1.valueChanges.pipe(takeUntil(this.terminator)).subscribe((value) => {
            this.formControlValueChangeEvent = value;
        });
        this.formControl1.statusChanges.pipe(takeUntil(this.terminator)).subscribe((status) => {
            this.formControlStatusChangeEvent = status;
        });
        this.formControl2.valueChanges.pipe(takeUntil(this.terminator)).subscribe((value) => {
            this.formControlValueChangeEvent = value;
        });
        this.formControl2.statusChanges.pipe(takeUntil(this.terminator)).subscribe((status) => {
            this.formControlStatusChangeEvent = status;
        });
        this.formControl3.valueChanges.pipe(takeUntil(this.terminator)).subscribe((value) => {
            this.formControlValueChangeEvent = value;
        });
        this.formControl3.statusChanges.pipe(takeUntil(this.terminator)).subscribe((status) => {
            this.formControlStatusChangeEvent = status;
        });

        this.formGroup.valueChanges.pipe(takeUntil(this.terminator)).subscribe((value) => {
            this.formGroupValueChangeEvent = value;
        });
        this.formGroup.statusChanges.pipe(takeUntil(this.terminator)).subscribe((status) => {
            this.formGroupStatusChangeEvent = status;
        });
    }

    ngOnDestroy() {
        this.terminator.next();
        this.terminator.complete();
    }
}
