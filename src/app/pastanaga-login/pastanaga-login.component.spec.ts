import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastanagaLoginComponent } from './pastanaga-login.component';

describe('PastanagaLoginComponent', () => {
  let component: PastanagaLoginComponent;
  let fixture: ComponentFixture<PastanagaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastanagaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastanagaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
