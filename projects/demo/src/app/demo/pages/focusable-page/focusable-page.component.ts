import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './focusable-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusablePageComponent {
  code = `<div paFocusable>Lorem Ipsum...</div>
<div paFocusable [paFocusDisabled]="true">Disabled Lorem Ipsum...</div>`;
}
