import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaDemoModule } from '../../demo.module';
import { AccordionBodyDirective, AccordionItemComponent } from '@guillotinaweb/pastanaga-angular';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [PaDemoModule, AccordionItemComponent, AccordionBodyDirective, RouterLink],
  templateUrl: './accordion-item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemPageComponent {
  expanded = false;

  code = `<pa-accordion-item
  id="item1"
  itemTitle="Standalone accordion item"
  description="Some description also visible in the header"
  [(expanded)]="expanded">
  <pa-accordion-item-body>
    Some content
  </pa-accordion-item-body>
</pa-accordion-item>`;
}
