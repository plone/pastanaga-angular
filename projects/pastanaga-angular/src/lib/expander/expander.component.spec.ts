import { ExpanderComponent } from './expander.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PaButtonModule } from '../button/button.module';
import { PaTranslateModule } from '../translate/translate.module';
import { MockModule } from 'ng-mocks';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ExpandComponent', () => {
    const createComponent = createComponentFactory({
        imports: [MockModule(PaButtonModule), MockModule(PaTranslateModule)],
        component: ExpanderComponent,
        detectChanges: false,
    });

    let component: ExpanderComponent;
    let spectator: Spectator<ExpanderComponent>;

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

    describe('updateContentHeight', () => {
        it('should set contentHeight CSS variable in a timeout', fakeAsync(() => {
            const setProperty = jest.fn();
            // @ts-ignore access private member
            component.elementRef.nativeElement.style.setProperty = setProperty;
            component.expanderContent = {
                nativeElement: {
                    getBoundingClientRect: jest.fn(() => ({ height: 100 })),
                },
            };

            // @ts-ignore access private member
            component.updateContentHeight();
            expect(setProperty).not.toHaveBeenCalled();
            tick();
            expect(setProperty).toHaveBeenCalledWith('--contentHeight', '100px');
        }));
    });

    describe('ngAfterViewInit', () => {
        it('should call updateContentHeight', () => {
            const updateContentHeight = jest.fn();
            //@ts-ignore access private member
            component.updateContentHeight = updateContentHeight;
            component.ngAfterViewInit();
            expect(updateContentHeight).toHaveBeenCalled();
        });
    });

    describe('contentLoaded', () => {
        it('should call updateContentHeight', () => {
            const updateContentHeight = jest.fn();
            //@ts-ignore access private member
            component.updateContentHeight = updateContentHeight;
            component.contentLoaded = true;
            expect(updateContentHeight).toHaveBeenCalled();
        });
    });
});
