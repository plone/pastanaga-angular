import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaIconModule } from '../icon/icon.module';
import { ButtonComponent } from './button.component';
import { Size } from '../common';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PaIconModule,
            ],
            declarations: [ButtonComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the icon size according the button size', () => {
        expect(component._iconSize).toEqual(Size.medium);
        component.size = Size.small;
        expect(component._iconSize).toEqual(Size.small);
    });
});
