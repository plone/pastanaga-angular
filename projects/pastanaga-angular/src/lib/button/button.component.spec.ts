import { PaIconModule } from '../icon/icon.module';
import { ButtonComponent } from './button.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockModule, ngMocks } from 'ng-mocks';
import { IconComponent } from '../icon';
import { Component } from '@angular/core';

@Component({ template: '' })
class TestComponent {}

describe('ButtonComponent', () => {
  let spectator: SpectatorHost<ButtonComponent, TestComponent>;
  let component: ButtonComponent;
  const createHost = createHostFactory({
    component: ButtonComponent,
    host: TestComponent,
    imports: [MockModule(PaIconModule)],
  });

  describe('when iconSize is not set', () => {
    it('should set the icon size according the button size – medium by default', () => {
      spectator = createHost(`<pa-button icon="search">Icon button</pa-button>`);
      component = spectator.component;
      expect(component.iconSize).toBeUndefined();
      const icon = ngMocks.find(spectator.debugElement, IconComponent);
      expect(icon.componentInstance.size).toEqual('medium');
    });

    it('should set icon size to small when button size is small', () => {
      spectator = createHost(`<pa-button icon="search" size="small">Icon button</pa-button>`);
      component = spectator.component;
      expect(component.iconSize).toBeUndefined();
      const icon = ngMocks.find(spectator.debugElement, IconComponent);
      expect(icon.componentInstance.size).toEqual('small');
    });

    it('should set icon size to large when button size is large', () => {
      spectator = createHost(`<pa-button icon="search" size="large">Icon button</pa-button>`);
      component = spectator.component;
      expect(component.iconSize).toBeUndefined();
      const icon = ngMocks.find(spectator.debugElement, IconComponent);
      expect(icon.componentInstance.size).toEqual('large');
    });
  });

  describe('when iconSize is set', () => {
    it('should set icon size accordingly to iconSize', () => {
      spectator = createHost(`<pa-button icon="search" iconSize="small">Icon button</pa-button>`);
      component = spectator.component;
      expect(component.iconSize).toBe('small');
      const icon = ngMocks.find(spectator.debugElement, IconComponent);
      expect(icon.componentInstance.size).toEqual('small');
    });

    it('should set icon size accordingly to iconSize even when button size is set', () => {
      spectator = createHost(`<pa-button icon="search" iconSize="medium" size="large">Icon button</pa-button>`);
      component = spectator.component;
      expect(component.size).toBe('large');
      expect(component.iconSize).toBe('medium');
      const icon = ngMocks.find(spectator.debugElement, IconComponent);
      expect(icon.componentInstance.size).toEqual('medium');
    });
  });
});
