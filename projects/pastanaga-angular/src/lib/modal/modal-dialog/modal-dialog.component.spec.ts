import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ModalDialogComponent } from './modal-dialog.component';
import { Component } from '@angular/core';
import {
    ModalDescriptionDirective,
    ModalFooterDirective,
    ModalImageDirective,
    ModalTitleDirective,
} from '../modal.directive';
import { MockDirective, MockModule } from 'ng-mocks';
import { PaButtonModule } from '../../button/button.module';
import { By } from '@angular/platform-browser';
import { ModalConfig, ModalRef } from '../modal.model';
import { TRANSITION_DURATION } from '../../common';

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

@Component({
    template: ` <pa-modal-dialog>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
        <pa-modal-footer>
            <pa-button kind="secondary" (click)="modal.close('from secondary')">Secondary CTA</pa-button>
            <pa-button kind="primary" (click)="modal.close('from primary')">Primary CTA</pa-button>
        </pa-modal-footer>
    </pa-modal-dialog>`,
})
export class TestDialogComponent {
    customStyle: any = {};
    constructor(public modal: ModalRef) {}
}

@Component({
    template: ` <pa-modal-dialog>
        <pa-modal-image><img src="assets/ninja.svg" alt="ninja" /></pa-modal-image>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
        <pa-modal-footer>
            <pa-button kind="secondary" (click)="modal.close('from secondary')">Secondary CTA</pa-button>
            <pa-button kind="primary" (click)="modal.close('from primary')">Primary CTA</pa-button>
        </pa-modal-footer>
    </pa-modal-dialog>`,
})
export class TestDialogImageComponent {
    constructor(public modal: ModalRef) {}
}

describe('DialogComponent', () => {
    let component: ModalDialogComponent | TestDialogComponent | TestDialogImageComponent;
    let fixture:
        | ComponentFixture<ModalDialogComponent>
        | ComponentFixture<TestDialogComponent>
        | ComponentFixture<TestDialogImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MockModule(PaButtonModule)],
            declarations: [
                ModalDialogComponent,
                TestDialogComponent,
                TestDialogImageComponent,
                MockDirective(ModalTitleDirective),
                MockDirective(ModalDescriptionDirective),
                MockDirective(ModalFooterDirective),
                MockDirective(ModalImageDirective),
            ],
            providers: [{ provide: ModalRef, useValue: new ModalRef({ id: 0, config: new ModalConfig() }) }],
        }).compileComponents();
    }));

    it(`should hide image container by default`, () => {
        fixture = TestBed.createComponent(TestDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const dialog: ModalDialogComponent = fixture.debugElement.query(By.directive(ModalDialogComponent))
            .componentInstance;
        expect(dialog.hasImage).toBe(false);
    });

    it(`should display image container when pa-modal-image is present`, () => {
        fixture = TestBed.createComponent(TestDialogImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const dialog: ModalDialogComponent = fixture.debugElement.query(By.directive(ModalDialogComponent))
            .componentInstance;
        expect(dialog.hasImage).toBe(true);
    });

    it('should save the dialog new top offset in a global variable on afterViewInit', fakeAsync(() => {
        fixture = TestBed.createComponent(TestDialogImageComponent);
        fixture.detectChanges();
        tick(TRANSITION_DURATION.slow);
        expect(
            window.getComputedStyle(document.documentElement).getPropertyValue('--containerTranslateY'),
        ).toBeTruthy();
    }));
});
