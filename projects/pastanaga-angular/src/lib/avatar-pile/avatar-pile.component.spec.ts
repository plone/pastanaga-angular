import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AvatarPileComponent } from './avatar-pile.component';
import { MockModule } from 'ng-mocks';
import { PaAvatarModule } from '../avatar/avatar.module';
import { PaButtonModule } from '../button/button.module';
import { PaDropdownModule } from '../dropdown/dropdown.module';
import { PaPopupModule } from '../popup/popup.module';
import { PaTranslateModule } from '../translate/translate.module';
import { AvatarModel } from '../avatar/avatar.model';
import { TranslatePipe } from '../translate/translate.pipe';
import { PaTooltipModule } from '../tooltip/tooltip.module';

describe('AvatarPileComponent', () => {
  const createComponent = createComponentFactory({
    imports: [
      MockModule(PaAvatarModule),
      MockModule(PaButtonModule),
      MockModule(PaDropdownModule),
      MockModule(PaPopupModule),
      MockModule(PaTooltipModule),
      MockModule(PaTranslateModule),
    ],
    mocks: [TranslatePipe],
    component: AvatarPileComponent,
    detectChanges: false,
  });
  let spectator: Spectator<AvatarPileComponent>;
  let component: AvatarPileComponent;
  const avatar1: AvatarModel = { userName: 'John Doe', userId: 'avatar1' };
  const avatar2: AvatarModel = { userName: 'Foo Bar', userId: 'avatar2' };
  const avatar3: AvatarModel = { userName: 'Toto', userId: 'avatar3' };
  const avatar4: AvatarModel = { userName: 'Titi', userId: 'avatar4' };

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should display up to 3 avatars', () => {
    component.avatars = [avatar1];
    expect(component.visibleAvatars).toEqual([avatar1]);

    component.avatars = [avatar1, avatar2];
    expect(component.visibleAvatars).toEqual([avatar1, avatar2]);

    component.avatars = [avatar1, avatar2, avatar3];
    expect(component.visibleAvatars).toEqual([avatar1, avatar2, avatar3]);

    component.avatars = [avatar1, avatar2, avatar3, avatar4];
    expect(component.visibleAvatars).toEqual([avatar1, avatar2, avatar3]);
  });

  it('should display avatars only when 3 buttons or less', () => {
    component.avatars = [avatar1, avatar2, avatar3];
    spectator.detectChanges();

    expect(spectator.queryAll('pa-avatar').length).toBe(3);
    expect(spectator.query('pa-button')).toBeFalsy();
    expect(spectator.query('pa-dropdown')).toBeFalsy();
  });

  it('should display a button when more than 3 avatars', () => {
    component.avatars = [avatar1, avatar2, avatar3, avatar4];
    spectator.detectChanges();

    expect(spectator.queryAll('pa-avatar').length).toBe(3);
    expect(spectator.query('pa-button')).toBeTruthy();
    expect(spectator.query('pa-dropdown')).toBeTruthy();
  });

  describe('more button', () => {
    const moreButtonSelector = 'pa-button[qa="more-avatars-button"]';
    beforeEach(() => {
      component.avatars = [avatar1, avatar2, avatar3, avatar4];
    });

    it('should open member dropdown by default', () => {
      spectator.detectChanges();
      expect(spectator.query(moreButtonSelector)?.getAttribute('ng-reflect-pa-popup')).not.toBe(null);
    });

    it('should not open member dropdown when customButton is true', () => {
      component.customButton = true;
      spectator.detectChanges();
      expect(spectator.query(moreButtonSelector)?.getAttribute('ng-reflect-pa-popup')).toBe(null);
    });

    it('should emit clickOnMore', () => {
      jest.spyOn(component.clickOnMore, 'emit');
      spectator.detectChanges();
      spectator.click(moreButtonSelector);
      expect(component.clickOnMore.emit).toHaveBeenCalled();
    });
  });
});
