import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockModule, ngMocks } from 'ng-mocks';
import { PaAvatarModule } from '../../avatar/avatar.module';
import { PaIconModule } from '../../icon/icon.module';
import { AvatarComponent } from '../../avatar/avatar.component';
import { ChipSelectionableComponent } from './chip-selectionable.component';
import { AvatarModel } from '../../avatar/avatar.model';
import { PaFocusableModule } from '../../focusable/focusable.module';
import { IconModel } from '../../icon/icon.model';
import { IconComponent } from '../../icon/icon.component';

@Component({ template: '' })
class TestComponent {
    avatar: AvatarModel = { userName: 'the name' };
    icon: IconModel = { name: 'iconName' };
    disabled = true;
    ariaRole = 'role';
    value = 'the value';

    onSelect(event: any) {}
}

describe('ChipSelectionableComponent', () => {
    let spectator: SpectatorHost<ChipSelectionableComponent, TestComponent>;
    const createHost = createHostFactory({
        component: ChipSelectionableComponent,
        host: TestComponent,
        imports: [MockModule(PaAvatarModule), MockModule(PaIconModule), MockModule(PaFocusableModule)],
    });

    it('should display an avatar when avatar is set', () => {
        spectator = createHost(`<pa-chip-selectionable [avatar]="avatar">A chip</pa-chip-selectionable>`);
        const avatar = ngMocks.find(spectator.debugElement, AvatarComponent);
        expect(avatar).toBeTruthy();
    });

    it('should display an icon when icon is set', () => {
        spectator = createHost(`<pa-chip-selectionable [icon]="icon">A chip</pa-chip-selectionable>`);
        const icon = ngMocks.find(spectator.debugElement, IconComponent);
        expect(icon).toBeTruthy();
    });

    it('should trigger select event when clicking on a chip which is not disabled', () => {
        spectator = createHost(
            `<pa-chip-selectionable [disabled]="disabled" (select)="onSelect()">A chip</pa-chip-selectionable>`,
        );
        const selected = jest.spyOn(spectator.hostComponent, 'onSelect');
        spectator.detectChanges();
        spectator.click(`.pa-chip`);
        expect(selected).not.toHaveBeenCalled();

        spectator.hostComponent.disabled = false;
        spectator.detectChanges();
        spectator.click(`.pa-chip`);
        expect(selected).toHaveBeenCalled();
    });
});
