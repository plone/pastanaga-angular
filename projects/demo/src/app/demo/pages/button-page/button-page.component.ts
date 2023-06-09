import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Size } from '@guillotinaweb/pastanaga-angular';

@Component({
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPageComponent {
  selectedSize: Size = 'medium';
  activeState = false;
  disabledState = false;
  codeExample = `<pa-button [kind]="selectedKind"
           [size]="selectedSize"
           [aspect]="selectedAspect"
           [disabled]="disabledState">
    Value
</pa-button>

<pa-button icon="search"
           iconAndText
           [kind]="selectedKind"
           [size]="selectedSize"
           [aspect]="selectedAspect"
           [disabled]="disabledState">
    Value
</pa-button>

<pa-button icon="search"
           [kind]="selectedKind"
           [size]="selectedSize"
           [aspect]="selectedAspect"
           [disabled]="disabledState">
    Value
</pa-button>`;

  clickOn($event: MouseEvent) {
    console.log(`Clicked on button`, $event);
  }
}
