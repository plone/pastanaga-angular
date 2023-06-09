import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'pa-demo-radio-page',
  templateUrl: './radio-page.component.html',
  styleUrls: ['./radio-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioPageComponent implements OnInit {
  favoriteSeason = 'Spring';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  meals: { label: string; disabled: boolean }[] = [
    { label: 'Spaghetti', disabled: false },
    { label: 'Lasagna', disabled: false },
    { label: 'Cheese', disabled: false },
    { label: 'Ratatouille', disabled: true },
  ];

  icons: string[] = ['trash', 'user', 'warning'];

  htmlRadio = `<input type="radio">`;
  paRadio = `<pa-radio>`;
  paRadioGroup = `<pa-radio-group>`;

  radioGroupExample = `<label for="radio-group-season">Pick your favorite season</label>
<pa-radio-group name="radio-season"
                id="radio-group-season"
                [(ngModel)]="favoriteSeason" >
    <pa-radio *ngFor="let season of seasons"
              [value]="season">{{season}}</pa-radio>
</pa-radio-group>
<p>Your favorite season is: {{favoriteSeason}} </p>`;

  formControl = new FormControl<string>('user');
  formGroup = new FormGroup({
    favoriteMeal: new FormControl<string>('Lasagna'),
  });
  formGroupDisabled = new FormGroup({
    favoriteMeal: new FormControl<string>('Lasagna'),
  });

  ngOnInit() {
    this.formGroupDisabled.disable();
  }
}
