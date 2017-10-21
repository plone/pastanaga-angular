import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNavigationLevelComponent } from './custom-navigation-level.component';

describe('CustomNavigationLevelComponent', () => {
  let component: CustomNavigationLevelComponent;
  let fixture: ComponentFixture<CustomNavigationLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomNavigationLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomNavigationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
