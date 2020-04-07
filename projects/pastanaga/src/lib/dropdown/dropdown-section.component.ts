import { Component, Input } from '@angular/core';

@Component({
    selector: 'pa-dropdown-section',
    templateUrl: 'dropdown-section.component.html',
})
export class DropdownSectionComponent {
    @Input() title?: string;
}
