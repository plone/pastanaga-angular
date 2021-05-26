import { DropdownComponent } from './dropdown.component';
import { OptionHeaderComponent } from './option-header/option-header.component';
import { OptionComponent } from './option/option.component';
import { SeparatorComponent } from './separator/separator.component';
import { PaIconModule } from '../icon/icon.module';
import { PaFocusableModule } from '../focusable/focusable.module';
import { PaAvatarModule } from '../avatar/avatar.module';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockComponent, MockModule } from 'ng-mocks';
import { PopupService } from '../popup/popup.service';
import { Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

const template = `<pa-dropdown>
    <pa-option-header>Menu list header</pa-option-header>
    <pa-option icon="home" id="menu-item-1" (selectOption)="onSelect($event)">Menu list item 1</pa-option>
    <pa-option disabled icon="globe" id="menu-item-2" (selectOption)="onSelect($event)"
        >Menu list item 2
    </pa-option>
    <pa-option icon="face-happy" id="menu-item-3" (selectOption)="onSelect($event)">Menu list item 3</pa-option>
    <pa-separator></pa-separator>
    <pa-option icon="trash" destructive id="menu-item-destructive" (selectOption)="onSelect($event)"
        >Menu item destructive
    </pa-option>
</pa-dropdown>`;

describe('Dropdown', () => {
    const createHost = createHostFactory({
        component: DropdownComponent,
        imports: [MockModule(PaIconModule), MockModule(PaFocusableModule), MockModule(PaAvatarModule)],
        declarations: [
            MockComponent(OptionHeaderComponent),
            MockComponent(OptionComponent),
            MockComponent(SeparatorComponent),
        ],
        providers: [
            {
                provide: PopupService,
                useValue: {
                    closeAllPopups: new Subject(),
                    closeAllButId: new Subject(),
                },
            },
        ],
        detectChanges: false,
    });
    let spectator: SpectatorHost<DropdownComponent>;

    beforeEach(() => {
        spectator = createHost(template);
    });

    it('should be hidden by default', () => {
        spectator.detectChanges();
        expect(spectator.query('.pa-popup')?.hasAttribute('hidden')).toBeTruthy();
    });

    it('should be displayed when calling show method', () => {
        // @ts-ignore access private member
        spectator.component.adjustPosition = jest.fn();
        spectator.component.show({});
        expect(spectator.query('.pa-popup')?.hasAttribute('hidden')).toBeFalsy();
    });

    it('should render options, headers and separators', () => {
        spectator.detectChanges();
        expect(spectator.queryAll('pa-option').length).toBe(4);
        expect(spectator.queryAll('pa-option-header').length).toBe(1);
        expect(spectator.queryAll('pa-separator').length).toBe(1);
    });

    it('should have role menu by default', () => {
        expect(spectator.component.role).toBe('menu');
    });
});
