import { ExpandComponent } from './expand.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PaButtonModule } from '../button/button.module';
import { PaTranslateModule } from '../translate/translate.module';
import { MockModule } from 'ng-mocks';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ExpandComponent', () => {
    const createComponent = createComponentFactory({
        imports: [MockModule(PaButtonModule), MockModule(PaTranslateModule)],
        component: ExpandComponent,
        detectChanges: false,
    });

    let component: ExpandComponent;
    let spectator: Spectator<ExpandComponent>;

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('should be expanded by default', () => {
        expect(component.expanded).toBe(true);
    });

    it('should toggle the expand when clicking on the button', () => {
        spectator.click('[qa="expand-button"]');
        expect(component.expanded).toBe(false);
        spectator.click('[qa="expand-button"]');
        expect(component.expanded).toBe(true);
    });

    it('should toggle the expand when clicking on the title', () => {
        spectator.click('[qa="expand-title"]');
        expect(component.expanded).toBe(false);
        spectator.click('[qa="expand-title"]');
        expect(component.expanded).toBe(true);
    });

    describe('ngAfterViewInit', () => {
        it('should set contentHeight CSS variable in a timeout', fakeAsync(() => {
            const setProperty = jest.fn();
            // @ts-ignore access private member
            component.elementRef.nativeElement.style.setProperty = setProperty;
            component.expandContent = {
                nativeElement: {
                    getBoundingClientRect: jest.fn(() => ({ height: 100 })),
                },
            };

            component.ngAfterViewInit();
            expect(setProperty).not.toHaveBeenCalled();
            tick();
            expect(setProperty).toHaveBeenCalledWith('--contentHeight', '100px');
        }));
    });
});
