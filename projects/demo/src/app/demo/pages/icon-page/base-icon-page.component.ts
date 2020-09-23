import { Size } from '../../../../../../pastanaga-angular/src';

export class BaseIconPageComponent {
    size = Size;
    icons: string[] = [];
    selectedSize: Size = Size.medium;
    selectedColor = 'none';
    selectedBackground = 'none';
    _selectedColor?: string;
    _selectedBackground?: string;
    nameResolvedExample = 'assets/icons-sprite.svg#${name}';
    codeExample = `<pa-icon [name]="iconName" [size]="selectedSize" [color]="selectedColor" [background]="selectedBackground"></pa-icon>

<pa-icon name="heart"></pa-icon>

<pa-icon path="./assets/dialog/heart-band.png"></pa-icon>
`;

    updateColor(value: string) {
        this._selectedColor = value === 'none' ? undefined : value;
    }

    updateBackground(value: string) {
        this._selectedBackground = value === 'none' ? undefined : value;
    }
}
