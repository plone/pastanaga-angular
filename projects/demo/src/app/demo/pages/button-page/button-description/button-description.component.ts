import {Component} from "@angular/core";

@Component({
    selector: 'pa-demo-button-description',
    templateUrl: './button-description.component.html',
})
export class ButtonDescriptionComponent {
    buttonLinkCode = `<pa-button aspect="basic"
           iconAndText
           icon="chevron-left">
  <a routerLink="..">{{ 'generic.back' | translate }}</a>
</pa-button>`;
}
