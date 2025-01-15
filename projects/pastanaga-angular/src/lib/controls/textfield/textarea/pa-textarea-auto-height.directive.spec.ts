import { Component, Renderer2 } from '@angular/core';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { PaTextareaAutoHeightDirective } from './pa-textarea-auto-height.directive';
import { BehaviorSubject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({ template: '', standalone: false })
class TestComponent {
  maxHeight: any;
  enabled = true;
  formControl = new FormControl();
}
describe('PaTextareaAutoHeightDirective', () => {
  const createDirective = createDirectiveFactory({
    directive: PaTextareaAutoHeightDirective,
    host: TestComponent,
    imports: [ReactiveFormsModule],
    providers: [Renderer2],
    detectChanges: false,
  });
  let spectator: SpectatorDirective<PaTextareaAutoHeightDirective, TestComponent>;
  let directive: PaTextareaAutoHeightDirective;
  let host: TestComponent;
  let renderer: Renderer2;
  let textarea: HTMLTextAreaElement;
  const measuredHeight$ = new BehaviorSubject(20);
  const initWithTemplate = (template: string) => {
    spectator = createDirective(template);
    directive = spectator.directive;
    host = spectator.hostComponent;
    renderer = spectator.inject(Renderer2, true);
    textarea = directive._textarea;
    jest.spyOn(renderer, 'addClass');
    jest.spyOn(renderer, 'removeClass');
    jest.spyOn(renderer, 'setStyle');
    jest.spyOn(renderer, 'removeStyle');
    jest.spyOn(textarea, 'scrollHeight', 'get').mockImplementation(() => measuredHeight$.value);
  };
  const whenMeasureReturns = (value: number) => {
    measuredHeight$.next(value);
  };

  const thenTextareaWasMeasured = () => {
    expect(renderer.addClass).toHaveBeenCalledWith(textarea, 'pa-textarea-autosize-measuring');
    expect(renderer.removeClass).toHaveBeenCalledWith(textarea, 'pa-textarea-autosize-measuring');
  };

  const thenHeightIsUpdatedWithValue = (height: number) => {
    expect(renderer.setStyle).toHaveBeenCalledWith(textarea, 'height', `${height}px`);
  };

  const thenTextareaHeightWasRemoved = () => {
    expect(renderer.removeStyle).toHaveBeenCalledWith(textarea, 'height');
  };

  it('should measure field height and resize', () => {
    initWithTemplate(`<textarea paTextareaAutoHeight></textarea>`);
    whenMeasureReturns(20);
    spectator.detectChanges();
    thenTextareaWasMeasured();
    thenHeightIsUpdatedWithValue(20 + directive._heightSafetynet);
  });
  it('should not exceed max height', () => {
    initWithTemplate(`<textarea paTextareaAutoHeight [paTextareaMaxHeight]="maxHeight"></textarea>`);
    host.maxHeight = 30;
    whenMeasureReturns(50);
    spectator.detectChanges();
    thenTextareaWasMeasured();
    thenHeightIsUpdatedWithValue(30);
  });
  it('should not resize if disabled', () => {
    initWithTemplate(`<textarea [paTextareaAutoHeight]="enabled"></textarea>`);
    whenMeasureReturns(30);
    spectator.detectChanges();
    thenTextareaWasMeasured();
    thenHeightIsUpdatedWithValue(30 + directive._heightSafetynet);
    host.enabled = false;
    spectator.detectChanges();
    thenTextareaHeightWasRemoved();
  });
  it('should resize on window resize', fakeAsync(() => {
    initWithTemplate(`<textarea paTextareaAutoHeight></textarea>`);
    whenMeasureReturns(20);
    spectator.detectChanges();

    whenMeasureReturns(30);
    spectator.dispatchFakeEvent(window, 'resize');
    tick(16);

    thenTextareaWasMeasured();
    thenHeightIsUpdatedWithValue(30 + directive._heightSafetynet);
  }));
  it('should resize on input event', () => {
    initWithTemplate(`<textarea paTextareaAutoHeight></textarea>`);
    whenMeasureReturns(20);
    spectator.detectChanges();

    whenMeasureReturns(30);
    spectator.dispatchFakeEvent(textarea, 'input');

    thenTextareaWasMeasured();
    thenHeightIsUpdatedWithValue(30 + directive._heightSafetynet);
  });
  it('should resize on form control change', () => {
    initWithTemplate(`<textarea paTextareaAutoHeight [formControl]="formControl"></textarea>`);
    whenMeasureReturns(20);
    spectator.detectChanges();

    whenMeasureReturns(30);
    host.formControl.patchValue('something');

    thenTextareaWasMeasured();
    thenHeightIsUpdatedWithValue(30 + directive._heightSafetynet);
  });
});
