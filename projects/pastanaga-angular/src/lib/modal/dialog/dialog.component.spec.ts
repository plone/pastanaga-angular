import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { Component } from '@angular/core';
import {
    ModalDescriptionDirective,
    ModalFooterDirective,
    ModalImageDirective,
    ModalTitleDirective,
} from '../modal.directive';
import { MockDirective, MockModule } from 'ng-mocks';
import { ModalRef, PaButtonModule } from '../../..';
import { createSpyObject } from '@ngneat/spectator/jest';
import { By } from "@angular/platform-browser";

@Component({
    template: ` <pa-dialog>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
        <pa-modal-footer>
            <pa-button kind="secondary" (click)="modal.close('from secondary')">Secondary CTA</pa-button>
            <pa-button kind="primary" (click)="modal.close('from primary')">Primary CTA</pa-button>
        </pa-modal-footer>
    </pa-dialog>`,
})
export class TestDialogComponent {
    constructor(public modal: ModalRef) {}
}

@Component({
    template: ` <pa-dialog>
        <pa-modal-image><img src="assets/ninja.svg" alt="ninja" /></pa-modal-image>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
        <pa-modal-footer>
            <pa-button kind="secondary" (click)="modal.close('from secondary')">Secondary CTA</pa-button>
            <pa-button kind="primary" (click)="modal.close('from primary')">Primary CTA</pa-button>
        </pa-modal-footer>
    </pa-dialog>`,
})
export class TestDialogImageComponent {
    constructor(public modal: ModalRef) {}
}

describe('DialogComponent', () => {
    let component: DialogComponent | TestDialogComponent | TestDialogImageComponent;
    let fixture:
        | ComponentFixture<DialogComponent>
        | ComponentFixture<TestDialogComponent>
        | ComponentFixture<TestDialogImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MockModule(PaButtonModule)],
            declarations: [
                DialogComponent,
                TestDialogComponent,
                TestDialogImageComponent,
                MockDirective(ModalTitleDirective),
                MockDirective(ModalDescriptionDirective),
                MockDirective(ModalFooterDirective),
                MockDirective(ModalImageDirective),
            ],
            providers: [{ provide: ModalRef, useFactory: () => createSpyObject(ModalRef) }],
        }).compileComponents();
    }));

    beforeEach(() => {
        const modalRef = TestBed.inject(ModalRef);
        modalRef.config = {} as any;
    });

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
        const dialog: DialogComponent = fixture.debugElement.query(By.directive(DialogComponent)).componentInstance;
        expect(dialog._hasImage).toBe(false);
    });

    it(`should display image container when pa-modal-image is present`, () => {
        fixture = TestBed.createComponent(TestDialogImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const dialog: DialogComponent = fixture.debugElement.query(By.directive(DialogComponent)).componentInstance;
        expect(dialog._hasImage).toBe(true);
    });
});
