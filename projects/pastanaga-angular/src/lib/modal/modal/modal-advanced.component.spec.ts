import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdvancedComponent } from './modal-advanced.component';
import { PaButtonModule } from '../../button/button.module';
import { ModalConfig, ModalRef } from '../modal.model';
import { MockModule } from 'ng-mocks';

describe('ModalComponent', () => {
    let component: ModalAdvancedComponent;
    let fixture: ComponentFixture<ModalAdvancedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MockModule(PaButtonModule)],
            declarations: [ModalAdvancedComponent],
            providers: [
                {
                    provide: ModalRef,
                    useValue: new ModalRef({ id: 0, config: new ModalConfig({}) }),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAdvancedComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it(`should set withCloseButton to true in its config`, () => {
        fixture.detectChanges();
        expect(component.ref.config.closeOnEsc).toBe(true);
    });
});
