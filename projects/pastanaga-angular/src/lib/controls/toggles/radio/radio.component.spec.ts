import { RadioComponent } from './radio.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

describe('RadioComponent', () => {
    let component: RadioComponent;
    let spectator: SpectatorHost<RadioComponent>;

    const createHost = createHostFactory({
        component: RadioComponent,
        detectChanges: false,
    });

    const thenInputHasAttribute = (attribute: string, value: any) => {
        expect(spectator.query('.pa-toggle-control')?.attributes.getNamedItem(attribute)?.value).toEqual(value);
    };
    const thenInputHasProperty = (property: string, value: any) => {
        expect((spectator.query<HTMLInputElement>('.pa-toggle-control') as any)[property]).toEqual(value);
    };

    it('should generate an id', () => {
        spectator = createHost(`<pa-radio></pa-radio>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasAttribute('id', 'pa-radio-0');
    });

    it('should use the label as aria-label', () => {
        spectator = createHost(`<pa-radio ariaLabel="Provided aria label">Some label</pa-radio>`);
        component = spectator.component;
        spectator.detectChanges();

        const label = spectator.query('.pa-toggle-label');
        expect(label?.innerHTML).toEqual('Some label');
        thenInputHasAttribute('aria-label', 'Some label');
    });

    it('should use ariaLabel provided when no label', () => {
        spectator = createHost(`<pa-radio ariaLabel="Provided aria label"></pa-radio>`);
        component = spectator.component;
        spectator.detectChanges();

        const label = spectator.query('.pa-toggle-label');
        expect(label?.innerHTML).toEqual('');
        thenInputHasAttribute('aria-label', 'Provided aria label');
    });

    it('should use value provided as aria-label when no label nor ariaLabel', () => {
        spectator = createHost(`<pa-radio value="Provided value"></pa-radio>`);
        component = spectator.component;
        spectator.detectChanges();

        const label = spectator.query('.pa-toggle-label');
        expect(label?.innerHTML).toEqual('');
        thenInputHasAttribute('aria-label', 'Provided value');
    });

    it('should hide the label tag when no label is provided', () => {
        spectator = createHost(`<pa-radio value="Provided value"></pa-radio>`);
        component = spectator.component;
        spectator.detectChanges();

        const label = spectator.query('.pa-toggle-label');
        expect(label?.hasAttribute('hidden')).toBeTruthy();
    });

    it('should have aria-checked reflecting checked property', () => {
        spectator = createHost(`<pa-radio value="Provided value"></pa-radio>`);
        component = spectator.component;
        spectator.detectChanges();
        thenInputHasAttribute('aria-checked', 'false');

        component.checked = true;
        component._markForCheck();
        spectator.detectChanges();
        thenInputHasAttribute('aria-checked', 'true');
    });

    it('should emit the value on selection', () => {
        spectator = createHost(`<pa-radio value="the value"></pa-radio>`);
        component = spectator.component;
        spectator.detectChanges();

        jest.spyOn(component.change, 'emit');
        spectator.click('.pa-toggle-label');
        expect(component.change.emit).toHaveBeenCalledWith({ value: 'the value' });
    });

    describe('when disabled', () => {
        it('should apply disabled property', () => {
            spectator = createHost(`<pa-radio value="value" disabled></pa-radio>`);
            component = spectator.component;
            spectator.detectChanges();

            thenInputHasProperty('disabled', true);
        });

        it('should not emit the value on click', () => {
            spectator = createHost(`<pa-radio value="the value" disabled></pa-radio>`);
            component = spectator.component;
            spectator.detectChanges();

            jest.spyOn(component.change, 'emit');
            spectator.click('.pa-toggle-label');
            expect(component.change.emit).not.toHaveBeenCalled();
        });
    });
});
