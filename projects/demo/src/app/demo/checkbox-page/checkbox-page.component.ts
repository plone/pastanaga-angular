import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './checkbox-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxPageComponent implements OnInit {
    disabledState = false;
    selectedType = 'checkbox';

    constructor() {
    }

    ngOnInit(): void {
    }

    updateType(value: string) {
        this.selectedType = value;
    }
}
