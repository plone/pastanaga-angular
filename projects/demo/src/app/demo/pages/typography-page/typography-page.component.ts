import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, ViewportMode } from '@guillotinaweb/pastanaga-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-demo-typography-page',
  templateUrl: './typography-page.component.html',
  styleUrls: ['./typography-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TypographyPageComponent {
  mode$: Observable<ViewportMode> = this.breakpoint.currentMode;

  constructor(private breakpoint: BreakpointObserver) {}
}
