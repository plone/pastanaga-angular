import { ControlsModule } from './controls.module';

describe('ControlsModule', () => {
  let controlsModule: ControlsModule;

  beforeEach(() => {
    controlsModule = new ControlsModule();
  });

  it('should create an instance', () => {
    expect(controlsModule).toBeTruthy();
  });
});
