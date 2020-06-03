import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Kind, Size, Weight } from '../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './button-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPageComponent implements OnInit {
    selectedSize: Size = Size.medium;
    selectedWeight: Weight = Weight.regular;
    selectedKind: Kind = Kind.secondary;
    disabledState = false;

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
}
