import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../../testing';
import { PaButtonModule } from '../../button/button.module';
import { ModalConfig, ModalRef } from '../modal.model';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [...TESTING_IMPORTS, PaButtonModule],
            providers: [...TESTING_PROVIDERS],
            declarations: [ModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it(`should set withCloseButton to true in its config`, () => {
        component.ref = new ModalRef({ id: 0, config: new ModalConfig({}) });
        fixture.detectChanges();
        expect(component.ref).toBeDefined();
        expect(component.ref?.config).toBeDefined();
        expect(component.ref?.config.withCloseButton).toBe(true);
    });
});
