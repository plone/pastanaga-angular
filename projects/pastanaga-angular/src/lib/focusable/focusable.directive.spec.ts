import { FocusableDirective } from './focusable.directive';
import { Component } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PaFocusableModule } from './focusable.module';
import { TAB } from '@angular/cdk/keycodes';

@Component({ template: '<div class="test" paFocusable [paFocusDisabled]="disabled">Disabled Lorem Ipsum...</div>' })
export class TestComponent {
  disabled = false;
}

describe('FocusableDirective', () => {
  let spectator: Spectator<TestComponent>;
  let component: TestComponent;
  const createComponent = createComponentFactory({
    component: TestComponent,
    imports: [PaFocusableModule],
    declarations: [TestComponent],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should set tabindex', () => {
    spectator.detectChanges();
    expect(spectator.query('.test')?.getAttribute('tabindex')).toEqual('0');
    component.disabled = true;
    spectator.detectChanges();
    expect(spectator.query('.test')?.getAttribute('tabindex')).toEqual('-1');
  });

  it('should apply no-browser-accessibility-styling', () => {
    spectator.detectChanges();
    expect(spectator.query('.test')?.classList.contains('pa-no-browser-accessibility-styling')).toEqual(true);
  });

  it('should apply pa-keyboard-focus on keyboard focus', () => {
    spectator.detectChanges();
    spectator.dispatchFakeEvent('.test', 'focus');
    expect(spectator.query('.test')?.classList.contains('pa-keyboard-focus')).toEqual(false);

    spectator.dispatchKeyboardEvent(document, 'keydown', TAB);
    spectator.focus('.test');
    expect(spectator.query('.test')?.classList.contains('pa-keyboard-focus')).toEqual(true);
  });
});
