import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'pa-button-doc',
    templateUrl: './button-doc.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDocComponent {
    code = `<pa-button [ariaLabel]="'someAria'" color="primary" size="small" (click)="onButtonClick($event)">Primary</pa-button>
<pa-button color="secondary" size="small" (click)="onButtonClick($event)">Secondary</pa-button>
<pa-button color="destructive" size="small" (click)="onButtonClick($event)">Destructive</pa-button>
<pa-button color="destructive" size="small" disabled (click)="onButtonClick($event)">Disabled</pa-button>
<pa-button color="primary" size="small" icon="delete" (click)="onButtonClick($event)">Primary</pa-button>
<pa-button color="secondary" size="small" icon="delete" (click)="onButtonClick($event)">Secondary</pa-button>
<pa-button color="destructive" size="small" icon="delete" (click)="onButtonClick($event)">Destructive</pa-button>
<pa-button color="destructive" size="small" icon="delete" disabled (click)="onButtonClick($event)">Disabled</pa-button>`;

    onButtonClick($event) {
        console.log('Clicked on button', $event);
    }
}
