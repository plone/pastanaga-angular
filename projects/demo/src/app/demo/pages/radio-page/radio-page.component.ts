import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'pa-demo-radio-page',
  templateUrl: './radio-page.component.html',
  styleUrls: ['./radio-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RadioPageComponent implements OnInit {
  favoriteSeason = 'Spring';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  meals: { label: string; disabled: boolean; help: string }[] = [
    { label: 'Spaghetti', disabled: false, help: 'With tomato sauce' },
    { label: 'Lasagna', disabled: false, help: 'Spinach and cream' },
    { label: 'Cheese', disabled: true, help: 'With toasted bread' },
    { label: 'Ratatouille', disabled: true, help: 'With rice' },
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

  radioGroupWithHelp = `<label for="radio-meals">Pick your favorite meal</label>
<pa-radio-group
  name="radio-meals"
  id="radio-meals"
  formControlName="favoriteMeal">
  <pa-radio
    *ngFor="let meal of meals"
    [value]="meal.label"
    [help]="meal.help">
    {{ meal.label }}
  </pa-radio>
</pa-radio-group>`;

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
