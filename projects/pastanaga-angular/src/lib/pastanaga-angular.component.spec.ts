import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastanagaAngularComponent } from './pastanaga-angular.component';

describe('PastanagaAngularComponent', () => {
  let component: PastanagaAngularComponent;
  let fixture: ComponentFixture<PastanagaAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastanagaAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastanagaAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
