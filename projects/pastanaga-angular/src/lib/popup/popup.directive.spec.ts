import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { PopupComponent } from './popup.component';
import { Component, Input, ViewChild } from '@angular/core';
import { PopupDirective } from './popup.directive';
import { PositionStyle } from '../common';

@Component({
    selector: 'pa-test-component',
    template: `<button [paPopup]="myPopup" [popupPosition]="position">click here</button>
        <pa-popup #myPopup><h1>Hi there!</h1></pa-popup>`,
})
class TestComponent {
    @ViewChild('myPopup') myPopup?: PopupComponent;
    @Input() position: PositionStyle = {};
}

describe('Popup Directive', () => {
    let spectator: SpectatorHost<TestComponent>;
    let component: TestComponent;
    const createHost = createHostFactory({
        component: TestComponent,
        declarations: [PopupComponent, PopupDirective],
        detectChanges: false,
    });
    beforeEach(() => {
        const startingPaPosition = { position: 'fixed', top: '30' };
        spectator = createHost(`<pa-test-component></pa-test-component>`);
        component = spectator.component;
        component.position = startingPaPosition;
        spectator.detectChanges();
    });

    it('should set custom position style data when popupPosition is available', () => {
        spectator.click('button');
        spectator.detectComponentChanges();
        expect(component.myPopup?.style).toEqual({ position: 'fixed', top: '30' });
    });

    it('should change position style data when popupPosition changes', () => {
        spectator.click('button');
        component.position = { position: 'absolute' };
        spectator.detectComponentChanges();
        expect(component.myPopup?.style).toEqual({ position: 'absolute' });
    });
});
