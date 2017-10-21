import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastanagaToolbarComponent } from './pastanaga-toolbar.component';

describe('PastanagaToolbarComponent', () => {
  let component: PastanagaToolbarComponent;
  let fixture: ComponentFixture<PastanagaToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastanagaToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastanagaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
