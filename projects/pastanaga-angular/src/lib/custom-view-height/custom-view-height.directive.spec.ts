import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { CustomViewHeightDirective } from './custom-view-height.directive';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '@ng-web-apis/common';

describe('CustomViewHeightDirective ', () => {
    let spectator: SpectatorDirective<CustomViewHeightDirective>;
    const createDirective = createDirectiveFactory({
        directive: CustomViewHeightDirective,
        detectChanges: false,
        providers: [
            {
                provide: WINDOW,
                useValue: {
                    innerHeight: 1250,
                },
            },
        ],
    });

    beforeEach(() => {
        spectator = createDirective(`<div paCustomViewHeight>Testing CustomViewHeightDirective</div>`);
    });

    it('should update customVh on initialization', () => {
        // === Setup ===
        spectator.directive.updateCustomVh = jest.fn();

        // === Execute ===
        spectator.detectChanges();

        // === Verify ===
        expect(spectator.directive.updateCustomVh).toHaveBeenCalled();
    });

    it('should update customVh on resize', () => {
        // === Setup ===
        spectator.directive.updateCustomVh = jest.fn();

        // === Execute ===
        spectator.dispatchFakeEvent(window, 'resize');

        // === Verify ===
        expect(spectator.directive.updateCustomVh).toHaveBeenCalled();
    });

    it('should update customVh on orientationchange', () => {
        // === Setup ===
        spectator.directive.updateCustomVh = jest.fn();

        // === Execute ===
        spectator.dispatchFakeEvent(window, 'orientationchange');

        // === Verify ===
        expect(spectator.directive.updateCustomVh).toHaveBeenCalled();
    });

    it('should define customVh', () => {
        // === Setup ===
        const document = spectator.inject(DOCUMENT);
        jest.spyOn(document.documentElement.style, 'setProperty');

        // === Execute ===
        spectator.directive.updateCustomVh();

        // === Verify ===
        expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--customVh', '12.5px');
    });
});
