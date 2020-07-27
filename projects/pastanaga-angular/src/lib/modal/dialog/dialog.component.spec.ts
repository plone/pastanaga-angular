import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../../testing';
import { Component, ViewChild } from '@angular/core';
import { IModal } from '../base-modal.component';
import { PaButtonModule, PaModalModule } from '../../..';

@Component({
    template: `<pa-dialog>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
        <pa-modal-footer>
            <pa-button kind="secondary" (click)="modal?.close('from secondary')">Secondary CTA</pa-button>
            <pa-button kind="primary" (click)="modal?.close('from primary')">Primary CTA</pa-button>
        </pa-modal-footer>
    </pa-dialog>`,
})
export class TestDialogComponent implements IModal {
    @ViewChild(DialogComponent, { static: true }) modal: DialogComponent | undefined;
}

@Component({
    template: `<pa-dialog>
        <pa-modal-image><img src="assets/ninja.svg" alt="ninja" /></pa-modal-image>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
        <pa-modal-footer>
            <pa-button kind="secondary" (click)="modal?.close('from secondary')">Secondary CTA</pa-button>
            <pa-button kind="primary" (click)="modal?.close('from primary')">Primary CTA</pa-button>
        </pa-modal-footer>
    </pa-dialog>`,
})
export class TestDialogImageComponent implements IModal {
    @ViewChild(DialogComponent, { static: true }) modal: DialogComponent | undefined;
}

describe('DialogComponent', () => {
    let component: DialogComponent | TestDialogComponent | TestDialogImageComponent;
    let fixture:
        | ComponentFixture<DialogComponent>
        | ComponentFixture<TestDialogComponent>
        | ComponentFixture<TestDialogImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [...TESTING_IMPORTS, PaModalModule, PaButtonModule],
            providers: [...TESTING_PROVIDERS],
            declarations: [TestDialogComponent, TestDialogImageComponent],
        }).compileComponents();
    }));

    it('should create', () => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it(`should hide image container by default`, () => {
        fixture = TestBed.createComponent(TestDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.modal).toBeDefined();
        expect(component.modal?._hasImage).toBe(false);
    });

    it(`should display image container when pa-modal-image is present`, () => {
        fixture = TestBed.createComponent(TestDialogImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.modal).toBeDefined();
        expect(component.modal?._hasImage).toBe(true);
    });
});
