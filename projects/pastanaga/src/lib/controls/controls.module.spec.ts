import { ControlsModule } from './controls.module';

describe('ControlsModule', () => {
  let controlsModule: ControlsModule;

  beforeEach(() => {
    controlsModule = new ControlsModule();
  });

  it('should create an instance', done => {
    expect(controlsModule).toBeTruthy();
    done();
  });
});
