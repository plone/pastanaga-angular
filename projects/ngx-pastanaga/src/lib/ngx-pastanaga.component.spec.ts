import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPastanagaComponent } from './ngx-pastanaga.component';

describe('NgxPastanagaComponent', () => {
  let component: NgxPastanagaComponent;
  let fixture: ComponentFixture<NgxPastanagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPastanagaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxPastanagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
