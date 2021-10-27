import { ToastComponent } from './toast.component';
import { PaIconModule } from '../icon';
import { PaTranslateModule } from '../translate';
import { MockModule } from 'ng-mocks';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('ToastComponent', () => {
    const createComponent = createComponentFactory({
        imports: [MockModule(PaIconModule), MockModule(PaTranslateModule)],
        component: ToastComponent,
        detectChanges: false,
    });

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
        component.config = { buttonLabel: 'undo' };
        spectator.detectChanges();
        expect(spectator.query('.pa-toast-button')).toBeTruthy();
    });
});
