import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@guillotinaweb/pastanaga-angular';

@Component({
  selector: 'pa-demo-container-demo',
  templateUrl: './container-demo.component.html',
  styleUrls: ['./container-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerDemoComponent {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  currentMinSize = this.breakpointObserver.currentMinSize;
  currentMode = this.breakpointObserver.currentMode;

  constructor(private breakpointObserver: BreakpointObserver) {}
}
