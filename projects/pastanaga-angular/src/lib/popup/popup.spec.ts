import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { PopupComponent } from './popup.component';
import { PopupDirective } from './popup.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <span id="outside"></span>
    <span
      id="myButton"
      [paPopup]="myPopup">
      Open popup
    </span>
    <pa-popup #myPopup></pa-popup>
  `,
  standalone: false,
})
export class TestComponent {
  @ViewChild('myPopup') popup?: PopupComponent;
}

describe('Popup', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [PopupComponent, PopupDirective, TestComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be hidden by default', () => {
    expect(component.popup?.isDisplayed).toBe(false);
  });

  it('should appear when clicking on the element with popup directive and close when clicking outside', () => {
    fixture.debugElement.query(By.css('#myButton')).nativeElement.click();
    fixture.detectChanges();
    expect(component.popup?.isDisplayed).toBe(true);
    fixture.debugElement.query(By.css('#outside')).nativeElement.click();
    fixture.detectChanges();
    expect(component.popup?.isDisplayed).toBe(false);
  });
});
