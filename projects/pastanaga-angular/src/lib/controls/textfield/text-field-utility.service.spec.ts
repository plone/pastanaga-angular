import { TextFieldUtilityService } from './text-field-utility.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('TextFieldUtilityService', () => {
    const autoFillEvents = new BehaviorSubject<any>(null);
    const createService = createServiceFactory({
        service: TextFieldUtilityService,
        imports: [ReactiveFormsModule],
    });
    let spectator: SpectatorService<TextFieldUtilityService>;
    let service: TextFieldUtilityService;
    let autoFillMonitor: AutofillMonitor;
    let platform: Platform;

    beforeEach(() => {
        spectator = createService();
        service = spectator.service;
        platform = spectator.inject(Platform);
        autoFillMonitor = spectator.inject(AutofillMonitor);
        autoFillMonitor.monitor = jest.fn(() => autoFillEvents.asObservable());
        autoFillMonitor.stopMonitoring = jest.fn();
    });
    it('should handleBrowserAutoFill until stopMonitoring', () => {
        const htmlElement = { value: '' } as any;
        const formControl = new FormControl();
        const stopMonitoring = new Subject<void>();
        jest.spyOn(autoFillMonitor, 'monitor');
        jest.spyOn(autoFillMonitor, 'stopMonitoring');
        service.handleBrowserAutoFill(htmlElement, formControl, stopMonitoring);
        expect(autoFillMonitor.monitor).toHaveBeenCalledWith(htmlElement);
        htmlElement.value = 'autoFilled';
        autoFillEvents.next({
            isAutofilled: true,
        });
        expect(formControl.value).toEqual('autoFilled');
        stopMonitoring.next();
        expect(autoFillMonitor.stopMonitoring).toHaveBeenCalledWith(htmlElement);
        // autofilled events untracked
        htmlElement.value = 'ignored';
        autoFillEvents.next({
            isAutofilled: true,
        });
        expect(formControl.value).toEqual('autoFilled');
    });
    it('should handleIosCaretPosition', () => {
        platform.IOS = true;
        const target = {
            value: '',
            setSelectionRange: () => {},
        };
        const htmlElement = {
            addEventListener: jest.fn((type: string, callback: (event: any) => {}) =>
                callback({
                    target,
                }),
            ),
        } as any;
        jest.spyOn(target, 'setSelectionRange');
        service.handleIosCaretPosition(htmlElement);
        expect(target.setSelectionRange).toHaveBeenCalledWith(1, 1);
        expect(target.setSelectionRange).toHaveBeenCalledWith(0, 0);
    });
});
