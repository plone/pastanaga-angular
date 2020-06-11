import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Kind, Size, Weight } from '../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './button-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPageComponent implements OnInit {
    selectedSize: Size = Size.medium;
    selectedWeight: Weight = Weight.accent;
    selectedKind: Kind = Kind.primary;
    disabledState = false;
    codeExample = `<pa-button [kind]="selectedKind"
           [size]="selectedSize"
           [weight]="selectedWeight"
           [disabled]="disabledState">
    Value
</pa-button>

<pa-button icon="search"
           iconAndText
           [kind]="selectedKind"
           [size]="selectedSize"
           [weight]="selectedWeight"
           [disabled]="disabledState">
    Value
</pa-button>

<pa-button icon="search"
           [kind]="selectedKind"
           [size]="selectedSize"
           [weight]="selectedWeight"
           [disabled]="disabledState">
    Value
</pa-button>`;

    constructor() {
    }

    ngOnInit(): void {
    }

    updateKind(value: string) {
        this.selectedKind = value as Kind;
    }
    updateSize(value: string) {
        this.selectedSize = value as Size;
    }
    updateWeight(value: string) {
        this.selectedWeight = value as Weight;
    }

    clickOn($event: MouseEvent) {
        console.log(`Clicked on button`, $event);
    }
}
