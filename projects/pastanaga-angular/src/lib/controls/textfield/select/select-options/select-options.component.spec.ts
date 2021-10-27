import { SelectOptionsComponent } from './select-options.component';
import { Component } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../control.model';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockComponent, MockModule, ngMocks } from 'ng-mocks';
import { OptionHeaderComponent, OptionComponent, PaDropdownModule, SeparatorComponent } from '../../../../dropdown';

@Component({ template: '' })
class TestComponent {
    options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];

    optionSelected() {}
}

describe('SelectOptionsComponent', () => {
    let component: SelectOptionsComponent;
    let spectator: SpectatorHost<SelectOptionsComponent, TestComponent>;
    const createHost = createHostFactory({
        component: SelectOptionsComponent,
        imports: [MockModule(PaDropdownModule)],
        host: TestComponent,
        mocks: [
            MockComponent(OptionHeaderComponent),
            MockComponent(SeparatorComponent),
            MockComponent(OptionComponent),
        ],
    });
    beforeEach(() => {
        spectator = createHost(
            `<pa-select-options [options]="options" (optionSelected)="optionSelected($event)"></pa-select-options>`,
        );
        component = spectator.component;
    });

    it('should render an optionHeader, a separator and an option and not filtered option', () => {
        spectator.detectChanges();
        spectator.hostComponent.options = [
            new OptionHeaderModel({ id: '1', label: 'header' }),
            new OptionSeparator(),
            new OptionModel({
                id: '2',
                label: 'option',
                value: 'A',
            }),
            new OptionModel({
                id: '2',
                label: 'option',
                value: 'A',
                filtered: true,
            }),
        ];
        spectator.detectChanges();
        const header = ngMocks.findAll(spectator.debugElement, OptionHeaderComponent);
        expect(header).toHaveLength(1);
        const separator = ngMocks.findAll(spectator.debugElement, SeparatorComponent);
        expect(separator).toHaveLength(1);
        const option = ngMocks.findAll(spectator.debugElement, OptionComponent);
        expect(option).toHaveLength(1);
    });
    it('should notify when an option is selected', () => {
        spectator.detectChanges();
        const option = new OptionModel({
            id: '2',
            label: 'option',
            value: 'A',
        });
        spectator.hostComponent.options = [option];
        spectator.detectChanges();
        jest.spyOn(spectator.hostComponent, 'optionSelected');
        const optionComponent = ngMocks.find(spectator.debugElement, OptionComponent);
        expect(optionComponent).toBeTruthy();
        optionComponent.componentInstance.selectOption.emit({} as any);
        spectator.detectChanges();
        expect(spectator.hostComponent.optionSelected).toHaveBeenCalledWith(option);
    });
});
