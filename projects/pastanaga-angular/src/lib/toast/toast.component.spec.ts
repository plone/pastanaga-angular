import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ToastComponent } from './toast.component';
import { PaIconModule } from '../..';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../testing';

describe('ToastComponent', () => {
    let component: ToastComponent;
    let fixture: ComponentFixture<ToastComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [...TESTING_IMPORTS, PaIconModule],
            providers: [...TESTING_PROVIDERS],
            declarations: [ToastComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToastComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display an icon when pa-icon is present', () => {
        component.config = { icon: 'warning' };
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.pa-toast-icon'))).toBeTruthy();
    });

    it('should display a button when an action is needed', () => {
        component.config = { buttonLabel: 'undo' };
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.pa-toast-button'))).toBeTruthy();
    });
});
