import { PaIconModule } from '../icon/icon.module';
import { ButtonComponent } from './button.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockModule } from 'ng-mocks';

describe('ButtonComponent', () => {
    const createComponent = createComponentFactory({
        imports: [MockModule(PaIconModule)],
        component: ButtonComponent,
        detectChanges: false,
    });
    let component: ButtonComponent;
    let spectator: Spectator<ButtonComponent>;

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('should set the icon size according the button size for medium and large', () => {
        expect(component._iconSize).toEqual('medium');
        component.size = 'large';
        expect(component._iconSize).toEqual('large');
        component.size = 'medium';
        expect(component._iconSize).toEqual('medium');
    });
    it('should set icon size "medium" when the button size is "small"', () => {
        component.size = 'small';
        expect(component._iconSize).toEqual('medium');
    });
});
