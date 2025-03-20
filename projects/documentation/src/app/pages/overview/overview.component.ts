import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPageModule } from '../../doc-page/doc-page.module';

@Component({
  selector: 'doc-overview',
  imports: [DocPageModule],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {}
