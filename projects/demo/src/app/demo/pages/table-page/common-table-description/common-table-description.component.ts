import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pa-demo-common-table-description',
  templateUrl: './common-table-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CommonTableDescriptionComponent {}
