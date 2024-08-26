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
    Some static content
  </pa-accordion-item-body>
</pa-accordion-item>`;

  conditionalExampleTemplate = `<pa-accordion-item
  #myAccordionItem
  id="item1"
  itemTitle="Standalone accordion item"
  description="Some description also visible in the header"
  [(expanded)]="expanded">
  <pa-accordion-item-body>
    <p>Some static content.</p>
    @if (dynamicContent) {
      <p>Some dynamic content.</p>
    }
  </pa-accordion-item-body>
</pa-accordion-item>`;

  updateHeightExample = `export class MyComponent {
  @ViewChild('myAccordionItem', { read: AccordionItemComponent }) myAccordionItem?: AccordionItemComponent;
  expanded = false;
  dynamicContent = false;

  toggleDynamicContent() {
    this.dynamicContent = !this.dynamicContent;
    this.myAccordionItem?.updateContentHeight();
  }
}`;
}
