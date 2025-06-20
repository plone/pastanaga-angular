import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockedDebugElement, MockModule, ngMocks } from 'ng-mocks';
import { AvatarComponent } from '../../avatar/avatar.component';
import { AvatarModel } from '../../avatar/avatar.model';
import { PaAvatarModule } from '../../avatar/avatar.module';
import { ButtonComponent } from '../../button/button.component';
import { PaButtonModule } from '../../button/button.module';
import { IconComponent } from '../../icon/icon.component';
import { IconModel } from '../../icon/icon.model';
import { PaIconModule } from '../../icon/icon.module';
import { ChipCloseableComponent } from './chip-closeable.component';

@Component({ template: '', standalone: false })
class TestComponent {
  avatar: AvatarModel = { userName: 'the name' };
  icon: IconModel = { name: 'iconName' };
  disabled = true;
  value = 'the value';

  onClose() {}
}

describe('ChipCloseableComponent', () => {
  let spectator: SpectatorHost<ChipCloseableComponent, TestComponent>;
  let closeButton: MockedDebugElement<ButtonComponent>;
  const createHost = createHostFactory({
    component: ChipCloseableComponent,
    host: TestComponent,
    imports: [MockModule(PaButtonModule), MockModule(PaAvatarModule), MockModule(PaIconModule)],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(
        `<pa-chip-closeable [value]="value" (closed)="onClose($event)">A chip</pa-chip-closeable>`,
      );
      closeButton = ngMocks.find(spectator.debugElement, ButtonComponent);
    });

    it('should have an enabled close button', () => {
      expect(closeButton.componentInstance.aspect).toEqual('basic');
      expect(closeButton.componentInstance.icon).toEqual('cross');
      expect(closeButton.componentInstance.kind).toEqual('secondary');
      expect(closeButton.componentInstance.size).toEqual('small');
      expect(closeButton.componentInstance.disabled).toEqual(false);
    });

    it('should notify the value when clicking on close button', () => {
      const closed = jest.spyOn(spectator.hostComponent, 'onClose');
      const mouseEvent = new MouseEvent('click');
      spectator.dispatchMouseEvent(closeButton, 'click', 0, 0, mouseEvent);
      expect(closed).toHaveBeenCalledWith({ event: mouseEvent, value: 'the value' });
    });
  });

  it('should display an avatar when avatar is set', () => {
    spectator = createHost(`<pa-chip-closeable [avatar]="avatar">A chip</pa-chip-closeable>`);
    const avatar = ngMocks.find(spectator.debugElement, AvatarComponent);
    expect(avatar).toBeTruthy();
  });

  it('should display an icon when icon is set', () => {
    spectator = createHost(`<pa-chip-closeable [icon]="icon">A chip</pa-chip-closeable>`);
    const icon = ngMocks.find(spectator.debugElement, IconComponent);
    expect(icon).toBeTruthy();
  });
});
