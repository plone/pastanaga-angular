import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { IModal } from './base-modal.component';
import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../testing';
import { PaModalModule } from './modal.module';
import { ModalConfig } from './modal.model';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
    template: `<pa-dialog>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
    </pa-dialog>`,
})
export class TestDialogComponent implements IModal {
    @ViewChild(DialogComponent, { static: true }) modal: DialogComponent | undefined;
}

describe('ModalService', () => {
    let service: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [...TESTING_IMPORTS, PaModalModule],
            providers: [...TESTING_PROVIDERS],
            declarations: [TestDialogComponent],
        })
            .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [TestDialogComponent] } })
            .compileComponents();
        service = TestBed.inject(ModalService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
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
            expect(service.modals[0].instance.modal.ref).toBe(ref);
        });

        it(`should increment the counter `, () => {
            expect(service.counter).toBe(0);
            service.openModal(TestDialogComponent);
            expect(service.counter).toBe(1);
        });

        it(`should set a default modal config`, () => {
            const ref = service.openModal(TestDialogComponent);
            expect(ref.config).toBeDefined();
            expect(ref.config.blocking).toBe(true);
            expect(ref.config.withCloseButton).toBe(false);
        });

        it(`should pass modal config to the modal component`, () => {
            const config = new ModalConfig({ blocking: false, withCloseButton: true });
            const ref = service.openModal(TestDialogComponent, config);
            expect(ref.config).toBe(config);
        });
    });

    it(`should close modal when ref.onClose event is triggered`, () => {
        const ref = service.openModal(TestDialogComponent);
        ref.onClose.emit();
        expect(service.modals.length).toBe(0);
        expect(service.hasModalOpened).toBe(false);
    });
});
