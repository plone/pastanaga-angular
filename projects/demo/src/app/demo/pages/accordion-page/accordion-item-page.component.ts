import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaDemoModule } from '../../demo.module';
import {
  AccordionBodyDirective,
  AccordionExtraDescriptionDirective,
  AccordionItemComponent,
  PaButtonModule,
} from '@guillotinaweb/pastanaga-angular';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    PaDemoModule,
    AccordionItemComponent,
    AccordionBodyDirective,
    RouterLink,
    AccordionExtraDescriptionDirective,
    PaButtonModule,
  ],
  templateUrl: './accordion-item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemPageComponent {
  expanded = false;
  expanded2 = false;

  code = `<pa-accordion-item
  id="item1"
  itemTitle="Standalone accordion item"
  description="Some description also visible in the header"
  [(expanded)]="expanded">
  <pa-accordion-item-body>
    Some static content
  </pa-accordion-item-body>
</pa-accordion-item>`;

  codeWithExtraContent = `<pa-accordion-item
  id="item2"
  itemTitle="Another accordion item with some extra content in its description"
  description="Some description also visible in the header"
  [(expanded)]="expanded2">
  <pa-accordion-item-extra-description>
    <p>Some extra description content</p>
    <pa-button (click)="$event.preventDefault(); $event.stopPropagation()">Some button</pa-button>
  </pa-accordion-item-extra-description>
  <pa-accordion-item-body>
    <p>Some content</p>
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
