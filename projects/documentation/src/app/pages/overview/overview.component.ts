import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaIconComponent } from 'ngx-pastanaga';

@Component({
  selector: 'doc-overview',
  imports: [PaIconComponent],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {}
