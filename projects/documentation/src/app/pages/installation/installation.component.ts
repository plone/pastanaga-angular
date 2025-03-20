import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPageModule } from '../../doc-page/doc-page.module';

@Component({
  selector: 'doc-installation',
  imports: [DocPageModule],
  templateUrl: './installation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationComponent {}
