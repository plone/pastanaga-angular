import { PaIconModule } from '../icon/icon.module';
import { ButtonComponent } from './button.component';
import { Size } from '../common';
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
        expect(component._iconSize).toEqual(Size.medium);
        component.size = Size.large;
        expect(component._iconSize).toEqual(Size.large);
        component.size = Size.medium;
        expect(component._iconSize).toEqual(Size.medium);
        component.size = Size.small;
        expect(component._iconSize).toEqual(Size.small);
    });
});
