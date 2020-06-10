import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './popup-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
