import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Kind, Size, Weight } from '../../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './button-page.component.html',
    styleUrls: ['./button-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPageComponent implements OnInit {
    kind = Kind;
    weight = Weight;
    size = Size;
    selectedSize: Size = Size.medium;
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

    clickOn($event: MouseEvent) {
        console.log(`Clicked on button`, $event);
    }
}
