import { Size } from '@guillotinaweb/pastanaga-angular';

export class BaseIconPageComponent {
  icons: string[] = [];
  selectedSize: Size = 'medium';
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
    this._selectedColor = value === 'none' ? 'inherit' : value;
  }

  updateBackground(value: string) {
    this._selectedBackground = value === 'none' ? 'transparent' : value;
  }
}
