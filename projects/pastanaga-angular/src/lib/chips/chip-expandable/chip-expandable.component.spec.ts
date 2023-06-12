import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockedDebugElement, MockModule, ngMocks } from 'ng-mocks';
import { ButtonComponent } from '../../button/button.component';
import { PaButtonModule } from '../../button/button.module';
import { PaAvatarModule } from '../../avatar/avatar.module';
import { PaIconModule } from '../../icon/icon.module';
import { AvatarComponent } from '../../avatar/avatar.component';
import { AvatarModel } from '../../avatar/avatar.model';
import { IconComponent } from '../../icon/icon.component';
import { IconModel } from '../../icon/icon.model';
import { ChipExpandableComponent } from './chip-expandable.component';

@Component({ template: '' })
class TestComponent {
  avatar: AvatarModel = { userName: 'the name' };
  icon: IconModel = { name: 'iconName' };
  disabled = true;
  ariaRole = 'role';

  onExpand() {}
}

describe('ChipExpandableComponent', () => {
  let spectator: SpectatorHost<ChipExpandableComponent, TestComponent>;
  let expandButton: MockedDebugElement<ButtonComponent>;
  const createHost = createHostFactory({
    component: ChipExpandableComponent,
    host: TestComponent,
    imports: [MockModule(PaButtonModule), MockModule(PaAvatarModule), MockModule(PaIconModule)],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<pa-chip-expandable (expanded)="onExpand($event)">A chip</pa-chip-expandable>`);
      expandButton = ngMocks.find(spectator.debugElement, ButtonComponent);
    });

    it('should have an expand button with a chevron-down icon', () => {
      expect(expandButton.attributes['aspect']).toEqual('basic');
      expect(expandButton.attributes['kind']).toEqual('secondary');
      expect(expandButton.attributes['size']).toEqual('small');
      expect(expandButton.attributes['ng-reflect-icon']).toEqual('chevron-down');
      expect(expandButton.attributes['ng-reflect-disabled']).toEqual('false');
    });

    it('should notify when clicking on expand button', () => {
      const expand = jest.spyOn(spectator.hostComponent, 'onExpand');
      const mouseEvent = new MouseEvent('click');
      spectator.dispatchMouseEvent(expandButton, 'click', 0, 0, mouseEvent);
      expect(expand).toHaveBeenCalled();
    });
  });

  it('should display an avatar when avatar is set', () => {
    spectator = createHost(`<pa-chip-expandable [avatar]="avatar">A chip</pa-chip-expandable>`);
    const avatar = ngMocks.find(spectator.debugElement, AvatarComponent);
    expect(avatar).toBeTruthy();
  });

  it('should display an icon when icon is set', () => {
    spectator = createHost(`<pa-chip-expandable [icon]="icon">A chip</pa-chip-expandable>`);
    const icon = ngMocks.find(spectator.debugElement, IconComponent);
    expect(icon).toBeTruthy();
  });
});
