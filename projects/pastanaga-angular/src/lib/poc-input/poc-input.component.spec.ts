import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocInputComponent } from './poc-input.component';

describe('PocInputComponent', () => {
  let component: PocInputComponent;
  let fixture: ComponentFixture<PocInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
