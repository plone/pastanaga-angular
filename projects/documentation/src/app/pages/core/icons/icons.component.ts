import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaIconComponent } from 'ngx-pastanaga';
import { ICONS } from '../../../../../public/assets/glyphs';
import { DocPageModule } from '../../../doc-page/doc-page.module';

@Component({
  selector: 'doc-icons',
  imports: [DocPageModule, PaIconComponent],
  templateUrl: './icons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  icons: string[] = ICONS.sort();
  codeExample = `<pa-icon name="x-circle"></pa-icon>`;
  styleExample = `<pa-icon name="x-circle" class="text-accent-500 dark:text-accent-400"></pa-icon>`;
  sizeExample = `<pa-icon name="x-circle" class="h-10 w-10"></pa-icon>`;
}
