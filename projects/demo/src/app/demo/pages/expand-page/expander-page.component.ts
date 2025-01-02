import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './expander-page.component.html',
  styleUrls: ['./expander-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ExpanderPageComponent {
  codeSample = `<pa-expander>
    <pa-expander-header>Section 1</pa-expander-header>
    <pa-expander-body>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
    </pa-expander-body>
</pa-expander>
<pa-expander>
    <pa-expander-header>
        Section 2
    </pa-expander-header>
    <pa-expander-header-side-block>
        <pa-button size="small"
                   icon="plus"
                   aspect="basic">Add</pa-button>
    </pa-expander-header-side-block>
    <pa-expander-body>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </pa-expander-body>
</pa-expander>`;

  accordionExample = `<pa-expander *ngFor="let section of accordionContent"
             emitOnly
             [expanded]="accordionOpen === section.title"
             (toggleExpander)="accordionOpen = accordionOpen === section.title ? '' : section.title">
    <pa-expander-header>{{section.title}}</pa-expander-header>
    <pa-expander-body>
        <p>{{section.content}}</p>
    </pa-expander-body>
</pa-expander>`;

  accordionContent = [
    { title: 'Beverage', content: 'water, milk, tea, coffee, juice' },
    { title: 'Fruits', content: 'Kiwi, orange, lemon, banana, pineapple, apple' },
    { title: 'Meat', content: 'beef, pork, lambs, sheep' },
    { title: 'Vegetables', content: 'Spinach, potato, tomato, artichoke, beetroot' },
  ];
  accordionOpen = '';

  toggleAccordion(title: string) {
    this.accordionOpen = this.accordionOpen === title ? '' : title;
  }
}
