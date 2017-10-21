import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastanagaEditDocumentComponent } from './pastanaga-edit-document.component';

describe('PastanagaEditDocumentComponent', () => {
  let component: PastanagaEditDocumentComponent;
  let fixture: ComponentFixture<PastanagaEditDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastanagaEditDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastanagaEditDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
