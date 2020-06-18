import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './checkbox-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxPageComponent implements OnInit {
    disabledState = false;
    selectedType = 'checkbox';
    code = `<pa-checkbox [disabled]="disabledState">Checkbox label</pa-checkbox>
<pa-checkbox type="radio"
             [disabled]="disabledState">Radio label</pa-checkbox>`;

    constructor() {
    }

    ngOnInit(): void {
    }
}
