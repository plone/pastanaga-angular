import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandComponent } from './expand.component';

describe('ExpandComponent', () => {
    let component: ExpandComponent;
    let fixture: ComponentFixture<ExpandComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpandComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExpandComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
