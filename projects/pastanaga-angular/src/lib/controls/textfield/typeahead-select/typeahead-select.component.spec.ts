import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';

import { TypeaheadSelectComponent } from './typeahead-select.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { FormFieldHintComponent, PaFormControlDirective } from '../../form-field';
import { MockComponent, MockModule, MockPipe, MockProvider, ngMocks } from 'ng-mocks';
import { DropdownComponent, PaDropdownModule } from '../../../dropdown';
import { PaPopupModule } from '../../../popup';
import { SelectOptionsComponent } from '../select';
import { PaIconModule } from '../../../icon';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../control.model';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { A11yModule, CdkMonitorFocus } from '@angular/cdk/a11y';
import { PA_LANG, PA_TRANSLATIONS, PaTranslateModule, TranslatePipe } from '../../../translate';

@Component({ template: '' })
class TestComponent {
    value: any;
    formControl = new FormControl();
    formGroup = new FormGroup({
        control: new FormControl(),
    });
    options?: (OptionModel | OptionSeparator | OptionHeaderModel)[];
    adjustHeight: any;
    hasFocus = false;

    label: any;
    placeholder: any;
    readonly: any;
    disabled: any;

    help: any;
    required: any;
    errorMessage: any;
    errorMessages: any;
    showAllErrors: any;

    valueChanged() {}
    statusChanged() {}
    onExpanded() {}
}

describe('TypeaheadSelectComponent', () => {
    let component: TypeaheadSelectComponent;
    let host: TestComponent;
    let spectator: SpectatorHost<TypeaheadSelectComponent, TestComponent>;

    const createHost = createHostFactory({
        component: TypeaheadSelectComponent,
        imports: [
            FormsModule,
            ReactiveFormsModule,
            MockModule(A11yModule),
            PaDropdownModule,
            PaPopupModule,
            MockModule(PaIconModule),
            MockModule(PaTranslateModule),
        ],
        host: TestComponent,
        providers: [
            MockProvider(SvgIconRegistryService),
            { provide: PA_LANG, useValue: 'en_US' },
            {
                provide: PA_TRANSLATIONS,
                useFactory: () => ({}),
            },
        ],
        declarations: [
            SelectOptionsComponent,
            PaFormControlDirective,
            MockComponent(FormFieldHintComponent),
            MockPipe(TranslatePipe, (value) => `translate--${value}`),
        ],
        detectChanges: false,
    });
    const thenInputHasAttribute = (attribute: string, value: any) => {
        expect(spectator.query('.pa-field-control')?.attributes.getNamedItem(attribute)?.value).toEqual(value);
    };
    const thenSelectHasValue = (value: any, label: any) => {
        expect(component.control.value).toEqual(value);
        expect((spectator.query('.pa-field-control') as HTMLInputElement)?.value).toEqual(label);
    };
    const thenSelectIsNotValuated = () => {
        expect(!!component.control.value).toEqual(false);
        // no selected option
        expect(spectator.queryAll('pa-dropdown pa-select-options pa-option .pa-option-selected')).toHaveLength(0);
        expect(spectator.queryAll('pa-dropdown pa-option .pa-option-selected')).toHaveLength(0);
    };
    const whenHostHasTwoOptionModels = () => {
        host.options = [
            new OptionModel({ id: '1', label: '1', value: '1' }),
            new OptionModel({ id: '2', label: '2', value: '2' }),
        ];
        spectator.detectChanges();
    };
    const optionsInTemplate = `<pa-option value="first">first label</pa-option><pa-option value="second">second label</pa-option>`;

    const whenFirstOptionClicked = () => {
        spectator.click('.pa-option');
        spectator.detectChanges();
    };

    const initWithTemplate = (template: string) => {
        spectator = createHost(template);
        component = spectator.component;
        host = spectator.hostComponent;
        spectator.detectChanges();
    };

    it('should have an id, a name and a label', () => {
        initWithTemplate(`<pa-typeahead-select [(ngModel)]="model" label="Label"></pa-typeahead-select>`);
        thenInputHasAttribute('id', 'select-1');
        thenInputHasAttribute('name', 'select-1');
        expect(spectator.query('.pa-field-label')?.innerHTML).toEqual('Label');
    });

    it('should have a drop down for options provided as ng-content', () => {
        initWithTemplate(
            `<pa-typeahead-select [(ngModel)]="model" label="Label">${optionsInTemplate}</pa-typeahead-select>`,
        );
        expect(component.ngContent?.toArray()).toHaveLength(2);
        expect(spectator.query('pa-dropdown')).toBeTruthy();
        expect(spectator.query('pa-select-options')).toEqual(null);
        expect(spectator.queryAll('pa-dropdown pa-option')).toHaveLength(2);
    });

    it('should have a drop down for options provided as OptionModel', () => {
        initWithTemplate(`<pa-typeahead-select [options]="options"></pa-typeahead-select>`);
        whenHostHasTwoOptionModels();
        expect(spectator.query('pa-dropdown')).toBeTruthy();
        expect(spectator.query('pa-select-options')).toBeTruthy();
        expect(spectator.queryAll('pa-dropdown pa-option')).toHaveLength(2);
    });

    it('should apply standalone value', () => {
        initWithTemplate(`<pa-typeahead-select [value]="value" [options]="options"></pa-typeahead-select>`);
        whenHostHasTwoOptionModels();
        thenSelectIsNotValuated();
        host.value = '1';
        spectator.detectChanges();
        thenSelectHasValue('1', '1');
        expect(spectator.queryAll('pa-dropdown pa-select-options pa-option .pa-option-selected')).toHaveLength(1);
    });

    it('should apply ngModel value', fakeAsync(() => {
        initWithTemplate(`<pa-typeahead-select [(ngModel)]="value" [options]="options"></pa-typeahead-select>`);
        whenHostHasTwoOptionModels();
        thenSelectIsNotValuated();
        host.value = '1';
        spectator.detectChanges();
        tick(100);
        thenSelectHasValue('1', '1');
        expect(spectator.queryAll('pa-dropdown pa-select-options pa-option .pa-option-selected')).toHaveLength(1);
        discardPeriodicTasks();
    }));

    it('should manage formControl value', () => {
        initWithTemplate(`<pa-typeahead-select [formControl]="formControl">${optionsInTemplate}</pa-typeahead-select>`);
        thenSelectIsNotValuated();
        host.formControl.patchValue('first');
        spectator.detectChanges();
        expect(component.control.value).toEqual('first');
        thenSelectHasValue('first', 'first label');
        expect(spectator.queryAll('pa-dropdown pa-option .pa-option-selected')).toHaveLength(1);
    });

    it('should manage formControlName value', () => {
        initWithTemplate(
            `<form [formGroup]="formGroup"><pa-typeahead-select formControlName="control" [options]="options"></pa-typeahead-select></form>`,
        );
        whenHostHasTwoOptionModels();
        thenSelectIsNotValuated();
        host.formGroup.patchValue({ control: '1' });
        spectator.detectChanges();
        expect(component.control.value).toEqual('1');
        thenSelectHasValue('1', '1');
        expect(spectator.queryAll('pa-dropdown pa-select-options pa-option .pa-option-selected')).toHaveLength(1);
    });

    it('should propagate standalone value', () => {
        initWithTemplate(
            `<pa-typeahead-select [value]="value" (valueChange)="valueChanged($event)">${optionsInTemplate}</pa-typeahead-select>`,
        );
        thenSelectIsNotValuated();
        const changeInHost = jest.spyOn(host, 'valueChanged');
        whenFirstOptionClicked();
        thenSelectHasValue('first', 'first label');
        expect(changeInHost).toHaveBeenCalledWith('first');
    });

    it('should propagate ngModel value', fakeAsync(() => {
        initWithTemplate(`<pa-typeahead-select [(ngModel)]="value">${optionsInTemplate}</pa-typeahead-select>`);
        tick(100);
        whenFirstOptionClicked();
        thenSelectHasValue('first', 'first label');
        expect(host.value).toEqual('first');
        discardPeriodicTasks();
    }));

    it('should propagate formControl value', () => {
        initWithTemplate(`<pa-typeahead-select [formControl]="formControl" [options]="options"></pa-typeahead-select>`);
        whenHostHasTwoOptionModels();
        thenSelectIsNotValuated();
        whenFirstOptionClicked();
        thenSelectHasValue('1', '1');
        expect(host.formControl.value).toEqual('1');
    });

    it('should propagate formControlName value', () => {
        initWithTemplate(
            `<form [formGroup]="formGroup"><pa-typeahead-select formControlName="control">${optionsInTemplate}</pa-typeahead-select></form>`,
        );
        thenSelectIsNotValuated();
        whenFirstOptionClicked();
        thenSelectHasValue('first', 'first label');
        expect(host.formGroup.value).toEqual({ control: 'first' });
    });

    it('should display placeholder or selected option label', fakeAsync(() => {
        initWithTemplate(
            `<pa-typeahead-select [(ngModel)]="model" [placeholder]="placeholder">${optionsInTemplate}</pa-typeahead-select>`,
        );
        expect((spectator.query('.pa-field-control') as HTMLInputElement)?.value).toEqual('');
        host.placeholder = 'placeholder';
        spectator.detectChanges();
        tick(100);
        expect((spectator.query('.pa-field-control') as HTMLInputElement)?.value).toEqual('placeholder');
        whenFirstOptionClicked();
        expect((spectator.query('.pa-field-control') as HTMLInputElement)?.value).toEqual('first label');
        discardPeriodicTasks();
    }));

    it('should apply disabled in standalone', () => {
        initWithTemplate(
            `<pa-typeahead-select [value]="value" [disabled]="disabled">${optionsInTemplate}</pa-typeahead-select>`,
        );
        expect(spectator.query('.pa-disabled')).toEqual(null);
        host.disabled = true;
        spectator.detectChanges();
        expect(component.control.disabled).toEqual(true);
        expect(spectator.query('.pa-disabled')).toBeTruthy();
    });

    it('should apply disabled in formGroup', () => {
        initWithTemplate(
            `<form [formGroup]="formGroup"><pa-typeahead-select formControlName="control">${optionsInTemplate}</pa-typeahead-select></form>`,
        );
        expect(spectator.query('.pa-disabled')).toEqual(null);
        host.formGroup.disable();
        expect(component.control.disabled).toEqual(true);
        expect(spectator.query('.pa-disabled')).toBeTruthy();
        // value is not updated
        whenFirstOptionClicked();
        expect(component.control.value).toEqual(null);
    });

    it('should apply readonly', () => {
        initWithTemplate(
            `<pa-typeahead-select [value]="value" [readonly]="readonly">${optionsInTemplate}</pa-typeahead-select>`,
        );
        expect(spectator.query('.pa-readonly')).toEqual(null);
        host.readonly = true;
        spectator.detectChanges();
        expect(spectator.query('.pa-readonly')).toBeTruthy();
        // value is not updated
        whenFirstOptionClicked();
        expect(component.control.value).toEqual(null);
    });

    it('should focus input', fakeAsync(() => {
        initWithTemplate(
            `<pa-typeahead-select [value]="value" [hasFocus]="hasFocus" (expanded)="onExpanded($event)">${optionsInTemplate}</pa-typeahead-select>`,
        );
        expect((spectator.query<HTMLElement>('.pa-popup') as any).hidden).toEqual(true);
        const selectClicked = jest.spyOn(component.selectInput?.nativeElement, 'click');
        const expanded = jest.spyOn(host, 'onExpanded');
        host.hasFocus = true;
        spectator.detectChanges();
        tick(100);
        expect(selectClicked).toHaveBeenCalled();
        expect(expanded).toHaveBeenCalledWith(true);
        spectator.detectChanges();
        expect((spectator.query<HTMLElement>('.pa-popup') as any).hidden).toEqual(false);
        discardPeriodicTasks();
    }));

    it('should toggle the icon when the dropdown is opened', fakeAsync(() => {
        initWithTemplate(`<pa-typeahead-select [value]="value">${optionsInTemplate}</pa-typeahead-select>`);
        expect(spectator.query('.pa-select-chevron')).toBeTruthy();
        expect(spectator.query('.pa-select-chevron.opened')).toEqual(null);
        spectator.click('.pa-field-control');
        tick(100);
        spectator.detectChanges();
        expect(spectator.query('.pa-select-chevron.opened')).toBeTruthy();
        discardPeriodicTasks();
    }));
    it('should toggle the dropdown clicking on the icon when active', fakeAsync(() => {
        initWithTemplate(`<pa-typeahead-select [readonly]="readonly">${optionsInTemplate}</pa-typeahead-select>`);
        expect((spectator.query<HTMLElement>('.pa-popup') as any).hidden).toEqual(true);
        spectator.click('.pa-select-chevron');
        tick(100);
        spectator.detectChanges();
        expect((spectator.query<HTMLElement>('.pa-popup') as any).hidden).toEqual(false);
        spectator.click('.pa-select-chevron');
        tick();
        spectator.detectChanges();
        expect((spectator.query<HTMLElement>('.pa-popup') as any).hidden).toEqual(true);
        host.readonly = true;
        spectator.detectChanges();
        spectator.click('.pa-select-chevron');
        tick();
        spectator.detectChanges();
        expect((spectator.query<HTMLElement>('.pa-popup') as any).hidden).toEqual(true);
        discardPeriodicTasks();
    }));
    it('should be touched and dirty ounce dropdown is closed', fakeAsync(() => {
        initWithTemplate(`<pa-typeahead-select [value]="value">${optionsInTemplate}</pa-typeahead-select>`);
        expect(component.control.pristine).toEqual(true);
        expect(component.control.touched).toEqual(false);
        spectator.click('.pa-field-control');
        tick(100);
        spectator.detectChanges();
        spectator.triggerEventHandler(DropdownComponent, 'onClose', true);
        expect(component.control.pristine).toEqual(false);
        expect(component.control.touched).toEqual(true);
        discardPeriodicTasks();
    }));

    it('should open dropdown with keyboard focus', fakeAsync(() => {
        initWithTemplate(
            `<pa-typeahead-select [value]="value" (expanded)="onExpanded($event)">${optionsInTemplate}</pa-typeahead-select>`,
        );
        expect((spectator.query<HTMLElement>('.pa-popup') as any).hidden).toEqual(true);
        const selectClicked = jest.spyOn(component.selectInput?.nativeElement, 'click');
        spectator.triggerEventHandler(CdkMonitorFocus, 'cdkFocusChange', 'keyboard');
        spectator.detectChanges();
        tick(100);
        expect(selectClicked).toHaveBeenCalled();
        spectator.detectChanges();
        expect((spectator.query<HTMLElement>('.pa-popup') as any).hidden).toEqual(false);
        discardPeriodicTasks();
    }));

    it('should display help', () => {
        initWithTemplate(`<pa-typeahead-select [help]="help">${optionsInTemplate}</pa-typeahead-select>`);
        host.help = 'a hint message';
        spectator.detectChanges();
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.help).toEqual('a hint message');
    });

    it('should apply required', fakeAsync(() => {
        initWithTemplate(
            `<pa-typeahead-select [(ngModel)]="model" [required]="required" (statusChange)="statusChanged($event)">${optionsInTemplate}</pa-typeahead-select>`,
        );
        expect(spectator.query('.pa-field-error')).toEqual(null);
        component.control.markAsDirty();
        expect(component.control.valid).toEqual(true);
        const statusChanged = jest.spyOn(host, 'statusChanged');
        host.required = true;
        tick(100);
        spectator.detectChanges();
        expect(component.control.valid).toEqual(false);
        expect(spectator.query('.pa-field-error')).toBeTruthy();
        expect(statusChanged).toHaveBeenCalledWith('INVALID');
        discardPeriodicTasks();
    }));

    it('should display errorMessages', fakeAsync(() => {
        initWithTemplate(
            `<pa-typeahead-select [(ngModel)]="model" [required]="required" [errorMessages]="errorMessages">${optionsInTemplate}</pa-typeahead-select>`,
        );
        component.control.markAsDirty();
        expect(component.control.valid).toEqual(true);
        host.required = true;
        tick(100);
        spectator.detectChanges();
        expect(component.control.valid).toEqual(false);
        const hint = ngMocks.find(spectator.debugElement, FormFieldHintComponent);
        expect(hint.componentInstance.errorMessages).toEqual(undefined);

        host.errorMessages = { required: 'field required' };
        spectator.detectChanges();
        expect(hint.componentInstance.errorMessages).toEqual({ required: 'field required' });
        discardPeriodicTasks();
    }));

    it('should render in dim mode', fakeAsync(() => {
        initWithTemplate(`<pa-typeahead-select label="my field" dim>${optionsInTemplate}</pa-typeahead-select>`);
        tick(100);
        expect(spectator.query('.pa-field-container.pa-dim')).toBeTruthy();
        whenFirstOptionClicked();
        expect(spectator.query('label.pa-sr-only')).toBeTruthy();
        discardPeriodicTasks();
    }));
});
