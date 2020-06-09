import { Size } from '../../../../../pastanaga-angular/src';

export class BaseIconPageComponent {
    icons: string[] = [];
    selectedSize: Size = Size.medium;
    selectedColor?: string;
    selectedBackground?: string;
    nameResolvedExample = 'assets/icons-sprite.svg#${name}';
    codeExample = `<pa-icon [name]="iconName" [size]="selectedSize" [color]="selectedColor" [background]="selectedBackground"></pa-icon>

<pa-icon name="heart"></pa-icon>

<pa-icon path="./assets/dialog/heart-band.png"></pa-icon>
`;

    constructor() {
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
