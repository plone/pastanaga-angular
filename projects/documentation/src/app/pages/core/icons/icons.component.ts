import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaIconComponent } from 'ngx-pastanaga';
import { ICONS } from '../../../../../public/assets/glyphs';

@Component({
  selector: 'doc-icons',
  imports: [PaIconComponent],
  templateUrl: './icons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  icons: string[] = ICONS.sort();
}
