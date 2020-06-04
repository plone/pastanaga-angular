import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import ICON_LIST from '../../../icons.json';
import { Size } from '../../../../../pastanaga-angular/src';

@Component({
    templateUrl: './icon-page.component.html',
    styleUrls: ['./icon-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPageComponent implements OnInit {
    icons: string[] = [];
    selectedSize: Size = Size.medium;
    selectedColor?: string;
    selectedBackground?: string;
    nameResolvedExample = './assets/icons/${name}.svg';
    codeExample = `<pa-icon [name]="iconName" [size]="selectedSize" [color]="selectedColor" [background]="selectedBackground"></pa-icon>

<pa-icon name="heart"></pa-icon>

<pa-icon path="./assets/dialog/heart-band.png"></pa-icon>
`;

    constructor() {
    }

    ngOnInit(): void {
        this.icons = ICON_LIST.map(icon => icon.substring(0, icon.lastIndexOf('.')));
    }

    updateSize(value: string) {
        this.selectedSize = value as Size;
    }

    updateColor(value: string) {
        this.selectedColor = value === 'none' ? undefined : value;
    }

    updateBackground(value: string) {
        this.selectedBackground = value === 'none' ? undefined : value;
    }
}
