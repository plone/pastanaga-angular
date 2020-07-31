import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-demo-menu-page',
    templateUrl: './dropdown-page.component.html',
    styles: [
        `
            pa-demo-examples {
                display: flex;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownPageComponent {
    codeExample = `<pa-button icon="ellipsis-vertical" size="small"
           [paPopup]="contextualMenu"></pa-button>

<pa-dropdown #contextualMenu>
    <pa-option-header>Menu list header</pa-option-header>
    <pa-option (selectOption)="onSelect($event)">Menu list item 1</pa-option>
    <pa-option (selectOption)="onSelect($event)">Menu list item 1</pa-option>
    <pa-option (selectOption)="onSelect($event)">Menu list item 3</pa-option>
    <pa-separator></pa-separator>
    <pa-option destructive dontCloseOnSelect (selectOption)="onSelect($event)">Menu item destructive</pa-option>
</pa-dropdown>`;

    onSelect($event: MouseEvent | KeyboardEvent) {
        console.log(`Selected menu:`, $event);
    }
}
