import { ExpanderComponent, transitionDuration } from './expander.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PaButtonModule } from '../button/button.module';
import { PaTranslateModule } from '../translate/translate.module';
import { MockModule } from 'ng-mocks';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ExpandComponent', () => {
    const updateContentHeight = jest.fn();
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
        spyOn(component, 'toggleExpand');
        spectator.click('[qa="expand-button"]');
        expect(component.toggleExpand).toHaveBeenCalled();
    });

    it('should toggle the expand when clicking on the title', () => {
        spyOn(component, 'toggleExpand');
        spectator.click('[qa="expand-title"]');
        expect(component.toggleExpand).toHaveBeenCalled();
    });

    describe('toggleExpand', () => {
        it('when expanded should collapse and then hide content', fakeAsync(() => {
            component.expanded = true;
            component.contentHidden = false;
            component.toggleExpand();
            expect(component.expanded).toBe(false);
            expect(component.contentHidden).toBe(false);
            tick(transitionDuration);
            expect(component.contentHidden).toBe(true);
        }));

        it('when collapsed should display content and then expand (so animation is visible)', fakeAsync(() => {
            //@ts-ignore access private member
            component.updateContentHeight = updateContentHeight;
            component.expanded = false;
            component.contentHidden = true;
            component.toggleExpand();
            expect(component.contentHidden).toBe(false);
            expect(component.expanded).toBe(false);
            expect(updateContentHeight).toHaveBeenCalled();
            tick();
            expect(component.expanded).toBe(true);
        }));
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
            //@ts-ignore access private member
            component.updateContentHeight = updateContentHeight;
            component.ngAfterViewInit();
            expect(updateContentHeight).toHaveBeenCalled();
        });
    });

    describe('contentLoaded', () => {
        it('should call updateContentHeight', () => {
            //@ts-ignore access private member
            component.updateContentHeight = updateContentHeight;
            component.contentLoaded = true;
            expect(updateContentHeight).toHaveBeenCalled();
        });
    });
});
