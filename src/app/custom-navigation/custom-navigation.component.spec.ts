import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNavigationComponent } from './custom-navigation.component';

describe('CustomNavigationComponent', () => {
  let component: CustomNavigationComponent;
  let fixture: ComponentFixture<CustomNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
