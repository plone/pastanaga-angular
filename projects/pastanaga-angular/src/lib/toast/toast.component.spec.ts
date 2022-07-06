import { ToastComponent } from './toast.component';
import { PaButtonModule } from '../button';
import { PaIconModule } from '../icon';
import { PaTranslateModule } from '../translate';
import { MockModule } from 'ng-mocks';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ToastComponent', () => {
    const createComponent = createComponentFactory({
        imports: [MockModule(PaIconModule), MockModule(PaTranslateModule), MockModule(PaButtonModule)],
        component: ToastComponent,
        detectChanges: false,
    });

    const DEFAULT_DELAY = 3400; // delay+animation
    const BUTTON_DELAY = 5400; // delay+animation

    let component: ToastComponent;
    let spectator: Spectator<ToastComponent>;

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('should display an icon when pa-icon is present', () => {
        component.config = { icon: 'warning' };
        spectator.detectChanges();
        expect(spectator.query('.pa-toast-icon')).toBeTruthy();
    });

    it('should display a button when an action is needed', () => {
        component.config = { button: { label: 'undo', action: () => {} } };
        spectator.detectChanges();
        expect(spectator.query('.pa-toast-button')).toBeTruthy();
    });

    it('should dismiss the default toast after the delay', fakeAsync(() => {
        spectator.detectChanges();
        jest.spyOn(component.dismiss, 'emit');
        tick(DEFAULT_DELAY - 1);
        expect(spectator.component.dismiss.emit).not.toHaveBeenCalled();
        tick(1);
        expect(spectator.component.dismiss.emit).toHaveBeenCalled();
    }));

    it('should dismiss the button toast after the delay', fakeAsync(() => {
        component.config = { autoClose: true, button: { label: 'undo', action: () => {} } };
        spectator.detectChanges();
        jest.spyOn(component.dismiss, 'emit');
        tick(BUTTON_DELAY - 1);
        expect(spectator.component.dismiss.emit).not.toHaveBeenCalled();
        tick(1);
        expect(spectator.component.dismiss.emit).toHaveBeenCalled();
    }));
});
