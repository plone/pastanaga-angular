import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastanagaHomeComponent } from './pastanaga-home.component';

describe('PastanagaHomeComponent', () => {
  let component: PastanagaHomeComponent;
  let fixture: ComponentFixture<PastanagaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastanagaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastanagaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
