import { InputFormatterDirective } from './input-formatter.directive';
import { Component, ElementRef } from '@angular/core';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { Keys } from '../../common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({ template: '' })
class TestComponent {
    formControl = new FormControl();
    formatter = (val: any) => `${val}-formatted`;
}

describe('InputFormatterDirective', () => {
    let spectator: SpectatorDirective<InputFormatterDirective, TestComponent>;
    const createDirective = createDirectiveFactory({
        directive: InputFormatterDirective,
        host: TestComponent,
        mocks: [ElementRef],
        imports: [ReactiveFormsModule],
    });
    it('should format the input', () => {
        spectator = createDirective(`<input [formControl]="formControl" [paInputFormatter]="formatter">`);
        spectator.typeInElement('input');
        spectator.dispatchKeyboardEvent(spectator.directive.el, 'keyup', Keys.arrowLeft);
        spectator.detectChanges();
        expect(spectator.hostComponent.formControl.value).toEqual('input-formatted');
    });

    it('should not format the input if formatter is skipped', () => {
        spectator = createDirective(
            `<input [formControl]="formControl" [paInputFormatter]="formatter" [paInputFormatterSkip]="true">`
        );
        spectator.typeInElement('input');
        spectator.dispatchKeyboardEvent(spectator.directive.el, 'keyup', Keys.arrowLeft);
        spectator.detectChanges();
        expect(spectator.hostComponent.formControl.value).toEqual('input');
    });
});
