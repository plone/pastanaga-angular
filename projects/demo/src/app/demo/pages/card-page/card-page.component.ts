import { Component } from '@angular/core';

@Component({
  selector: 'pa-demo-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  standalone: false,
})
export class CardPageComponent {
  example = `<pa-card [disabled]="isDisabled"
         (cardClick)="onClick($event)">
    <h4>Some title</h4>
    <p class="body-s">Card content can be anything</p>
</pa-card>`;

  onClick() {
    console.log('You clicked on a card');
  }
}
