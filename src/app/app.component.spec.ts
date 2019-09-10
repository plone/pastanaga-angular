import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  BadgeModule,
  ButtonModule,
  ControlsModule,
  ProgressModule,
  ToasterModule,
  TooltipModule,
  TextFieldModule,
  ExpandModule,
  TranslateModule,
} from '../../projects/pastanaga/src';
import * as en from './translateKeys.json';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        TranslateModule,
        BadgeModule,
        ButtonModule,
        ControlsModule,
        ProgressModule,
        ToasterModule.forRoot(),
        TextFieldModule,
        TooltipModule,
        ExpandModule,
    ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: 'en_US', useValue: {...en} as any}
      ]
    }).compileComponents();
  }));
  it('should render title in a h1 tag', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Pastanaga usage examples');
    done();
  });
});
