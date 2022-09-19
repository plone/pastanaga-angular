import { RadioGroupDirective } from './radio-group.directive';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { RadioComponent } from './radio.component';
import { PaFormControlDirective } from '../../form-field';
import { fakeAsync, flush, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

describe('RadioGroupDirective', () => {
    let directive: RadioGroupDirective;
    let spectator: SpectatorHost<RadioGroupDirective>;

    const createHost = createHostFactory({
        component: RadioGroupDirective,
        imports: [FormsModule],
        declarations: [RadioComponent, PaFormControlDirective],
        detectChanges: false,
    });

    it('should create an instance', fakeAsync(() => {
        spectator = createHost(
            `<pa-radio-group name="radio-gaga"><pa-radio value="queen">Queen</pa-radio><pa-radio value="gaga">Gaga</pa-radio></pa-radio-group>`,
        );
        directive = spectator.component;
        spectator.detectChanges();

        tick();

        const radios = spectator.queryAll(RadioComponent);
        expect(radios.length).toBe(2);
        expect(radios[0].name).toBe('radio-gaga');
        expect(radios[1].name).toBe('radio-gaga');
    }));

    it('should apply disabled state to all the radios', fakeAsync(() => {
        spectator = createHost(
            `<pa-radio-group name="radio-gaga" disabled><pa-radio value="queen">Queen</pa-radio><pa-radio value="gaga">Gaga</pa-radio></pa-radio-group>`,
        );
        directive = spectator.component;
        spectator.detectChanges();

        tick();

        const radios = spectator.queryAll(RadioComponent);
        expect(radios.length).toBe(2);
        expect(radios[0].disabled).toBe(true);
        expect(radios[1].disabled).toBe(true);
    }));

    it('should select the radio matching the value passed by ngModel', fakeAsync(() => {
        spectator = createHost(
            `<pa-radio-group name="radio-gaga" [ngModel]="'gaga'"><pa-radio value="queen">Queen</pa-radio><pa-radio value="gaga">Gaga</pa-radio></pa-radio-group>`,
        );
        directive = spectator.component;
        spectator.detectChanges();

        tick(200);

        const radios = spectator.queryAll(RadioComponent);
        expect(radios.length).toBe(2);
        expect(radios[0].checked).toBe(false);
        expect(radios[1].checked).toBe(true);

        flush();
    }));

    it('should update radio checked status when selecting another radio of the group', fakeAsync(() => {
        spectator = createHost(
            `<pa-radio-group name="radio-gaga" [ngModel]="'gaga'">
                        <pa-radio value="queen">Queen</pa-radio>
                        <pa-radio value="radio">Radio</pa-radio>
                        <pa-radio value="gaga">Gaga</pa-radio>
                    </pa-radio-group>`,
        );
        directive = spectator.component;
        spectator.detectChanges();

        tick(200);

        let radios = spectator.queryAll(RadioComponent);
        expect(radios.length).toBe(3);
        expect(radios[0].checked).toBe(false);
        expect(radios[1].checked).toBe(false);
        expect(radios[2].checked).toBe(true);

        radios[0].select();

        tick(200);

        radios = spectator.queryAll(RadioComponent);
        expect(radios[0].checked).toBe(true);
        expect(radios[1].checked).toBe(false);
        expect(radios[2].checked).toBe(false);
    }));
});
