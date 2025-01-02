import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockModule, ngMocks } from 'ng-mocks';
import { PaButtonModule } from '../../button/button.module';
import { PaAvatarModule } from '../../avatar/avatar.module';
import { PaIconModule } from '../../icon/icon.module';
import { AvatarComponent } from '../../avatar/avatar.component';
import { AvatarModel } from '../../avatar/avatar.model';
import { IconComponent } from '../../icon/icon.component';
import { IconModel } from '../../icon/icon.model';
import { ChipComponent } from './chip.component';

@Component({ template: '', standalone: false })
class TestComponent {
  avatar: AvatarModel = { userName: 'the name' };
  icon: IconModel = { name: 'iconName' };
  value = 'the value';
}

describe('ChipComponent', () => {
  let spectator: SpectatorHost<ChipComponent, TestComponent>;
  const createHost = createHostFactory({
    component: ChipComponent,
    host: TestComponent,
    imports: [MockModule(PaButtonModule), MockModule(PaAvatarModule), MockModule(PaIconModule)],
  });

  it('should display an avatar when avatar is set', () => {
    spectator = createHost(`<pa-chip [avatar]="avatar">A chip</pa-chip>`);
    const avatar = ngMocks.find(spectator.debugElement, AvatarComponent);
    expect(avatar).toBeTruthy();
  });

  it('should display an icon when icon is set', () => {
    spectator = createHost(`<pa-chip [icon]="icon">A chip</pa-chip>`);
    const icon = ngMocks.find(spectator.debugElement, IconComponent);
    expect(icon).toBeTruthy();
  });
});
