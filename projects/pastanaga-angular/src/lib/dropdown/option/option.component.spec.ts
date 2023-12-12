import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { OptionComponent } from './option.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { PaIconModule } from '../../icon';
import { PopupService } from '../../popup';
import { PaFocusableModule } from '../../focusable';
import { PaTooltipModule } from '../../tooltip';

describe('Option', () => {
  const createHost = createHostFactory({
    component: OptionComponent,
    imports: [MockModule(PaIconModule), MockModule(PaFocusableModule), MockModule(PaTooltipModule)],
    providers: [MockProvider(PopupService)],
  });
  let spectator: SpectatorHost<OptionComponent>;

  it('should display an icon when icon attribute is defined', () => {
    spectator = createHost(`<pa-option icon="warning">with icon</pa-option>`);
    expect(spectator.query('pa-icon')).toBeTruthy();
  });

  it('should display an icon when icon attribute is defined', () => {
    spectator = createHost(`<pa-option [icon]="{name: 'info'}">with icon</pa-option>`);
    expect(spectator.query('pa-icon')).toBeTruthy();
  });

  it('should not display an icon when icon attribute is not defined', () => {
    spectator = createHost(`<pa-option>without icon</pa-option>`);
    expect(spectator.query('pa-icon')).toBeFalsy();
  });

  it('should not display an icon when icon attribute is empty', () => {
    spectator = createHost(`<pa-option icon="">without icon</pa-option>`);
    expect(spectator.query('pa-icon')).toBeFalsy();
  });
});
