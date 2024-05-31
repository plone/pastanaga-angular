import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaDemoModule } from '../../demo.module';
import { AccordionBodyDirective, AccordionComponent, AccordionItemComponent } from '@guillotinaweb/pastanaga-angular';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [PaDemoModule, AccordionComponent, AccordionItemComponent, AccordionBodyDirective, RouterLink],
  templateUrl: './accordion-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionPageComponent {
  code = `<pa-accordion>
  <pa-accordion-item
    id="item1"
    itemTitle="Item 1"
    description="Description 1">
    <pa-accordion-item-body>
      Some content
    </pa-accordion-item-body>
  </pa-accordion-item>
  <pa-accordion-item
    id="item2"
    itemTitle="Item 2">
    <pa-accordion-item-body>
      <p>Content 2</p>
    </pa-accordion-item-body>
  </pa-accordion-item>
  <pa-accordion-item
    id="item3"
    itemTitle="Item 3">
    <pa-accordion-item-body>
      <p>Content 3</p>
    </pa-accordion-item-body>
  </pa-accordion-item>
  <pa-accordion-item
    id="item4"
    itemTitle="Item 4"
    description="Description 4">
    <pa-accordion-item-body>
      <p>Content 4</p>
    </pa-accordion-item-body>
  </pa-accordion-item>
</pa-accordion>`;
}
