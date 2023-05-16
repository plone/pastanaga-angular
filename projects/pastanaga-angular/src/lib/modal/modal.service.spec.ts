import { fakeAsync, tick } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { Component } from '@angular/core';
import { PaModalModule } from './modal.module';
import { ModalConfig, ModalRef } from './modal.model';
import { MockModule } from 'ng-mocks';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

@Component({
    template: `<pa-modal-dialog>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
    </pa-modal-dialog>`,
})
export class TestDialogComponent {
    constructor(public modal: ModalRef) {}
}

describe('ModalService', () => {
    const createService = createServiceFactory({
        imports: [MockModule(PaModalModule)],
        service: ModalService,
        declarations: [TestDialogComponent],
    });
    let service: ModalService;
    let spectator: SpectatorService<ModalService>;

    beforeEach(() => {
        spectator = createService();
        service = spectator.service;
    });

    describe('openModal', () => {
        it(`should set hasModalOpened to true`, () => {
            expect(service.hasModalOpened).toBe(false);
            service.openModal(TestDialogComponent);
            expect(service.hasModalOpened).toBe(true);
        });

        it(`should add the modal ref to modals before returning it`, () => {
            expect(service.modals.length).toBe(0);
            const ref = service.openModal(TestDialogComponent);
            expect(service.modals.length).toBe(1);
            expect(service.modals[0].instance.modal).toBe(ref);
        });

        it(`should increment the counter `, () => {
            const ref1 = service.openModal(TestDialogComponent);
            const ref2 = service.openModal(TestDialogComponent);
            expect(ref2.id - ref1.id).toBe(1);
        });

        it(`should set a default modal config`, () => {
            const ref = service.openModal(TestDialogComponent);
            expect(ref.config).toBeDefined();
            expect(ref.config.dismissable).toBe(true);
        });

        it(`should pass modal config to the modal component`, () => {
            const config = new ModalConfig({ dismissable: false });
            const ref = service.openModal(TestDialogComponent, config);
            expect(ref.config).toBe(config);
        });
    });

    it(`should close modal when ref.onDismiss event is triggered`, fakeAsync(() => {
        const ref = service.openModal(TestDialogComponent);
        ref.dismiss();
        tick();
        expect(service.modals.length).toBe(0);
        expect(service.hasModalOpened).toBe(false);
    }));
});
