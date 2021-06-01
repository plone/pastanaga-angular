import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollComponent } from './infinite-scroll.component';

describe('VirtualScrollComponent', () => {
    let component: InfiniteScrollComponent;
    let fixture: ComponentFixture<InfiniteScrollComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InfiniteScrollComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InfiniteScrollComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
