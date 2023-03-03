import { BaseModalComponent } from './base-modal.component';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ModalConfig, ModalRef } from './modal.model';
import { Keys } from '../common';
import { createSpyObject, SpyObject } from '@ngneat/spectator/jest';
import { Subject } from 'rxjs';

describe('BaseModalComponent', () => {
    let cdr: ChangeDetectorRef;
    let modalRef: SpyObject<ModalRef>;
    let baseModal: BaseModalComponent;
    let events: { [event: string]: EventListener } = {};

    beforeEach(() => {
        cdr = {
            markForCheck: jest.fn(() => {}),
            detectChanges: jest.fn(() => {}),
        } as any as ChangeDetectorRef;
        modalRef = createSpyObject(ModalRef, { onClose: new Subject().asObservable() });
        modalRef.id = 1;
        baseModal = new BaseModalComponent(modalRef, cdr);
    });

    beforeEach(() => {
        events = {};
        document.addEventListener = jest.fn((event, callback) => {
            events[event] = callback as EventListener;
        });
    });

    describe('ngAfterViewInit', () => {
        it(`should setup id and config from ref`, () => {
            expect(baseModal.id).toBe(0);
            expect(baseModal.config.dismissable).toBe(true);

            modalRef.config = new ModalConfig({ dismissable: false });
            baseModal.ngAfterViewInit();
            expect(baseModal.id).toBe(modalRef.id);
            expect(baseModal.config.dismissable).toBe(false);
        });

        it(`should setup keydown event listener`, () => {
            expect(events['keydown']).not.toBeDefined();
            baseModal.ngAfterViewInit();
            expect(events['keydown']).toBeDefined();
        });
    });

    describe('outsideClick', () => {
        let mockClose: jest.Mock;
        let mockPreventDefault: jest.Mock;
        let fakeMouseEvent: MouseEvent;

        beforeEach(() => {
            mockClose = jest.fn(() => {});
            mockPreventDefault = jest.fn(() => {});
            baseModal.close = mockClose;
            fakeMouseEvent = {
                target: { outerHTML: 'pa-modal-backdrop' },
                preventDefault: mockPreventDefault,
            } as any as MouseEvent;
        });

        it(`should not close when config is not dismissable`, () => {
            baseModal.config.dismissable = false;
            baseModal.outsideClick(fakeMouseEvent);
            expect(mockPreventDefault.mock.calls.length).toBe(1);
            expect(mockClose.mock.calls.length).toBe(0);
        });

        it(`should close when config is dismissable`, () => {
            baseModal.outsideClick(fakeMouseEvent);
            expect(mockPreventDefault.mock.calls.length).toBe(1);
            expect(mockClose.mock.calls.length).toBe(1);
        });
    });

    describe('close', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        it(`should set closing to true and call detectChanges`, () => {
            expect(baseModal.closing).toBe(false);
            baseModal.close();
            expect(baseModal.closing).toBe(true);
            expect((cdr.detectChanges as jest.Mock).mock.calls.length).toBe(1);
        });

        it(`should set off to true and trigger ref's onDismiss after moderate transition duration`, () => {
            baseModal.close();
            expect(baseModal.off).toBe(false);
            expect(modalRef.dismiss).not.toHaveBeenCalled();

            jest.runAllTimers();
            expect(baseModal.off).toBe(true);
            expect((cdr.detectChanges as jest.Mock).mock.calls.length).toBe(2);
            expect(modalRef.dismiss).toHaveBeenCalled();
        });
    });

    describe('onKeyDown', () => {
        let mockStopPropagation: jest.Mock;
        let fakeKeypressEvent: KeyboardEvent;
        let mockEnterPressed: jest.Mock;
        let mockClose: jest.Mock;

        beforeEach(() => {
            mockStopPropagation = jest.fn(() => {});
            mockEnterPressed = jest.fn(() => {});
            mockClose = jest.fn(() => {});

            baseModal.close = mockClose;
            baseModal.enterPressed = { emit: mockEnterPressed } as any as EventEmitter<void>;
            baseModal.ngAfterViewInit();
        });

        it(`should emit enterPressed when pressing enter`, () => {
            fakeKeypressEvent = {
                key: Keys.enter,
                stopPropagation: mockStopPropagation,
            } as any as KeyboardEvent;

            events['keydown'](fakeKeypressEvent);
            expect(mockStopPropagation.mock.calls.length).toBe(1);
            expect(mockEnterPressed.mock.calls.length).toBe(1);
            expect(mockClose.mock.calls.length).toBe(0);
        });

        it(`should do nothing if ref is not the last one`, () => {
            modalRef.isLast = false;
            baseModal.config = new ModalConfig();
            fakeKeypressEvent = {
                key: Keys.esc,
                stopPropagation: mockStopPropagation,
            } as any as KeyboardEvent;
            events['keydown'](fakeKeypressEvent);
            expect(mockStopPropagation.mock.calls.length).toBe(0);
            expect(mockEnterPressed.mock.calls.length).toBe(0);
            expect(mockClose.mock.calls.length).toBe(0);
        });

        it(`should do nothing when pressing ESC and dismissable is false`, () => {
            baseModal.config = new ModalConfig({ dismissable: false });
            fakeKeypressEvent = {
                key: Keys.esc,
                stopPropagation: mockStopPropagation,
            } as any as KeyboardEvent;
            events['keydown'](fakeKeypressEvent);
            expect(mockStopPropagation.mock.calls.length).toBe(0);
            expect(mockEnterPressed.mock.calls.length).toBe(0);
            expect(mockClose.mock.calls.length).toBe(0);
        });

        it(`should close when pressing ESC and config has dismissable set to true`, () => {
            modalRef.isLast = true;
            baseModal.config = new ModalConfig({ dismissable: true });
            fakeKeypressEvent = {
                key: Keys.esc,
                stopPropagation: mockStopPropagation,
            } as any as KeyboardEvent;
            events['keydown'](fakeKeypressEvent);
            expect(mockStopPropagation.mock.calls.length).toBe(1);
            expect(mockEnterPressed.mock.calls.length).toBe(0);
            expect(mockClose.mock.calls.length).toBe(1);
            // close was called with `false` as data
            expect(mockClose.mock.calls[0][0]).toBe(false);
        });
    });
});
