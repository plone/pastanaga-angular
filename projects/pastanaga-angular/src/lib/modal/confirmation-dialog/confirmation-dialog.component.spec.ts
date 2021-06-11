import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockModule, MockPipe } from 'ng-mocks';
import { PaButtonModule } from '../../button/button.module';
import { PaTranslateModule } from '../../translate/translate.module';
import { ConfirmationData, ModalConfig, ModalRef } from '../modal.model';
import { TranslatePipe } from '../../translate/translate.pipe';

describe('ConfirmationDialogComponent', () => {
    const title = 'Confirmation title';
    const description = 'Confirmation description';
    const createComponent = createComponentFactory({
        imports: [MockModule(PaButtonModule), MockModule(PaTranslateModule)],
        component: ConfirmationDialogComponent,
        declarations: [MockPipe(TranslatePipe, (value) => `translate--${value}`)],
        providers: [
            {
                provide: ModalRef,
                useValue: new ModalRef({
                    id: 0,
                    config: new ModalConfig({ data: { title } }),
                }),
            },
        ],
        detectChanges: false,
    });
    let component: ConfirmationDialogComponent;
    let spectator: Spectator<ConfirmationDialogComponent>;
    let modalRef: ModalRef;

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
        modalRef = spectator.inject(ModalRef);
    });

    describe('by default', () => {
        beforeEach(() => {
            spectator.detectChanges();
        });

        it('should display title set in modal ref', () => {
            expect(spectator.query('[qa="confirmation-title"]')?.textContent?.trim()).toBe(`translate--${title}`);
        });

        it('should display pastanaga cancel and confirm labels on buttons', () => {
            expect(spectator.query('[qa="confirmation-dialog-cancel-button"]')?.textContent?.trim()).toBe(
                'translate--pastanaga.cancel',
            );
            expect(spectator.query('[qa="confirmation-dialog-confirm-button"]')?.textContent?.trim()).toBe(
                'translate--pastanaga.confirm',
            );
        });

        it('should display confirm button as primary kind', () => {
            expect(spectator.query('[qa="confirmation-dialog-confirm-button"]')?.getAttribute('ng-reflect-kind')).toBe(
                'primary',
            );
        });
    });

    describe('when specific data is set', () => {
        beforeEach(() => {
            modalRef.config = new ModalConfig<ConfirmationData>({
                data: {
                    title,
                    description,
                    isDestructive: true,
                    confirmLabel: 'custom-confirm',
                    cancelLabel: 'custom-cancel',
                },
            });
            spectator.detectChanges();
        });

        it('should display description set in modal ref', () => {
            expect(spectator.query('[qa="confirmation-description"]')?.textContent?.trim()).toBe(
                `translate--${description}`,
            );
        });

        it('should display cancel and confirm labels set in modal ref', () => {
            expect(spectator.query('[qa="confirmation-dialog-cancel-button"]')?.textContent?.trim()).toBe(
                'translate--custom-cancel',
            );
            expect(spectator.query('[qa="confirmation-dialog-confirm-button"]')?.textContent?.trim()).toBe(
                'translate--custom-confirm',
            );
        });

        it('should display confirm button as destructive kind', () => {
            expect(spectator.query('[qa="confirmation-dialog-confirm-button"]')?.getAttribute('ng-reflect-kind')).toBe(
                'destructive',
            );
        });
    });

    describe('ngAfterViewInit', () => {
        it('should setFocus and refresh on ngAfterViewInit', () => {
            spyOn(component, 'setFocus');
            spyOn(component, 'refresh');

            component.ngAfterViewInit();

            expect(component.setFocus).toHaveBeenCalled();
            expect(component.refresh).toHaveBeenCalled();
        });
    });

    describe('actions', () => {
        beforeEach(() => {
            spyOn(component, 'close');
        });

        it('should close with false when clicking on cancel', () => {
            spectator.click('[qa="confirmation-dialog-cancel-button"]');
            expect(component.close).toHaveBeenCalledWith(false);
        });

        it('should close with true when clicking on confirm', () => {
            spectator.click('[qa="confirmation-dialog-confirm-button"]');
            expect(component.close).toHaveBeenCalledWith(true);
        });
    });
});
