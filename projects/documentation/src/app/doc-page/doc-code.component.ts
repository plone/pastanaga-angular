import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'doc-code',
  standalone: false,
  template: `<pre
    class="rounded bg-gray-100 px-4 py-2 dark:bg-gray-800"
  ><code><ng-content></ng-content></code></pre>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocCodeComponent {}
