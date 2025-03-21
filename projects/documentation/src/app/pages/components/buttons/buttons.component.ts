import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPageModule } from '../../../doc-page/doc-page.module';
import { PaButtonComponent, PaIconComponent } from 'ngx-pastanaga';

@Component({
  selector: 'doc-buttons',
  imports: [DocPageModule, PaButtonComponent, PaIconComponent],
  templateUrl: './buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {
  default = '<pa-button>Default</pa-button>';
  disabled = '<pa-button disabled="true">Filled</pa-button>';
  icon = `<pa-button><pa-icon name="cloud-arrow-up"></pa-icon> Upload</pa-button>
<pa-button>Upload <pa-icon name="cloud-arrow-up"></pa-icon></pa-button>`;
  variants = `<pa-button variant="outlined">Outlined</pa-button>`;
  colors = `<pa-button color="neutral">Neutral</pa-button>`;
  size = `<pa-button size="sm">Small</pa-button>`;
}
