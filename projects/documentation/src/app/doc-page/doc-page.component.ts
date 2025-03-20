import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'doc-page',
  templateUrl: './doc-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DocPageComponent {}
