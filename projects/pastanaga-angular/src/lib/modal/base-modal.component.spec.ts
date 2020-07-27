import { BaseModalComponent } from './base-modal.component';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ModalConfig, ModalRef } from './modal.model';
import { Keys } from '../common';

describe('BaseModalComponent', () => {
    const config = new ModalConfig({ blocking: false, withCloseButton: true });
    const ref = new ModalRef({ id: 1, config });
    let cdr: ChangeDetectorRef;
    let baseModal: BaseModalComponent;
    let events: { [event: string]: EventListener } = {};

    beforeEach(() => {
        cdr = ({
            markForCheck: jest.fn(() => {}),
            detectChanges: jest.fn(() => {}),
        } as any) as ChangeDetectorRef;
        baseModal = new BaseModalComponent(cdr);
        baseModal.ref = ref;
    });

    beforeEach(() => {
        events = {};
        document.addEventListener = jest.fn((event, callback) => {
            events[event] = callback as EventListener;
        });
    });

    it(`should create`, () => {
        expect(baseModal).toBeTruthy();
    });

    describe('ngAfterViewInit', () => {
        it(`should setup id and config from ref`, () => {
            expect(baseModal.id).toBe(0);
            expect(baseModal.config.blocking).toBe(true);
            expect(baseModal.config.withCloseButton).toBe(false);

            baseModal.ngAfterViewInit();
            expect(baseModal.id).toBe(ref.id);
            expect(baseModal.config.blocking).toBe(config.blocking);
            expect(baseModal.config.withCloseButton).toBe(config.withCloseButton);
        });

        it(`should setup keydown event listener`, () => {
            expect(events.keydown).not.toBeDefined();
            baseModal.ngAfterViewInit();
            expect(events.keydown).toBeDefined();
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
            fakeMouseEvent = ({
                target: { className: 'pa-modal-backdrop' },
                preventDefault: mockPreventDefault,
            } as any) as MouseEvent;
        });

        it(`should not close when config is blocking`, () => {
            baseModal.outsideClick(fakeMouseEvent);
            expect(mockPreventDefault.mock.calls.length).toBe(1);
            expect(mockClose.mock.calls.length).toBe(0);
        });

        it(`should close when config is not blocking`, () => {
            baseModal.config.blocking = false;
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

        it(`should set off to true and trigger ref's onClose after 700ms`, () => {
            const mockOnClose = jest.fn(() => {});
            const mockedRef: ModalRef = ({ ...ref, onClose: { emit: mockOnClose } } as any) as ModalRef;
            baseModal.ref = mockedRef;
            baseModal.close();
            expect(baseModal.off).toBe(false);
            expect(mockOnClose.mock.calls.length).toBe(0);

            jest.runAllTimers();
            expect(baseModal.off).toBe(true);
            expect((cdr.detectChanges as jest.Mock).mock.calls.length).toBe(2);
            expect(mockOnClose.mock.calls.length).toBe(1);
        });
    });

    describe('onKeyDown', () => {
        let mockStopPropagation: jest.Mock;
        let fakeKeypressEvent: KeyboardEvent;
        let mockOnEnter: jest.Mock;
        let mockClose: jest.Mock;

        beforeEach(() => {
            mockStopPropagation = jest.fn(() => {});
            mockOnEnter = jest.fn(() => {});
            mockClose = jest.fn(() => {});

            baseModal.close = mockClose;
            baseModal.onEnter = ({ emit: mockOnEnter } as any) as EventEmitter<void>;
            baseModal.ngAfterViewInit();
        });

        it(`should emit onEnter when pressing enter`, () => {
            fakeKeypressEvent = ({
                key: Keys.enter,
                stopPropagation: mockStopPropagation,
            } as any) as KeyboardEvent;

            events.keydown(fakeKeypressEvent);
            expect(mockStopPropagation.mock.calls.length).toBe(1);
            expect(mockOnEnter.mock.calls.length).toBe(1);
            expect(mockClose.mock.calls.length).toBe(0);
        });

        it(`should do nothing if ref is not the last one`, () => {
            baseModal.ref = { ...ref, isLast: false };
            baseModal.config = new ModalConfig({ withCloseButton: true });
            fakeKeypressEvent = ({
                key: Keys.esc,
                stopPropagation: mockStopPropagation,
            } as any) as KeyboardEvent;
            events.keydown(fakeKeypressEvent);
            expect(mockStopPropagation.mock.calls.length).toBe(0);
            expect(mockOnEnter.mock.calls.length).toBe(0);
            expect(mockClose.mock.calls.length).toBe(0);
        });

        it(`should do nothing when pressing ESC and config has withCloseButton set to false`, () => {
            baseModal.config = new ModalConfig({ withCloseButton: false });
            fakeKeypressEvent = ({
                key: Keys.esc,
                stopPropagation: mockStopPropagation,
            } as any) as KeyboardEvent;
            events.keydown(fakeKeypressEvent);
            expect(mockStopPropagation.mock.calls.length).toBe(0);
            expect(mockOnEnter.mock.calls.length).toBe(0);
            expect(mockClose.mock.calls.length).toBe(0);
        });

        it(`should close when pressing ESC and config has withCloseButton set to true`, () => {
            baseModal.config = new ModalConfig({ withCloseButton: true });
            fakeKeypressEvent = ({
                key: Keys.esc,
                stopPropagation: mockStopPropagation,
            } as any) as KeyboardEvent;
            events.keydown(fakeKeypressEvent);
            expect(mockStopPropagation.mock.calls.length).toBe(1);
            expect(mockOnEnter.mock.calls.length).toBe(0);
            expect(mockClose.mock.calls.length).toBe(1);
            // close was called with `false` as data
            expect(mockClose.mock.calls[0][0]).toBe(false);
        });
    });
});
