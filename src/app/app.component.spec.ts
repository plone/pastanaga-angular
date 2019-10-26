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
    RichtextModule,
    SidebarModule,
    TranslateModule,
} from '../../projects/pastanaga/src';

const en = {
    'common': {
        'close': 'Close',
        'loading': 'Loading…',
        'dismiss': 'Dismiss',
        'select-all': 'Select all',
        'deselect-all': 'Deselect all',
        'expand': 'Expand',
        'collapse': 'Collapse',
        'reset': 'Reset',
        'yes': 'Yes',
        'no': 'No'
    },
    'demo-page': {
        'title': 'Pastanaga usage examples'
    }
};

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
        RichtextModule,
        SidebarModule,
    ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: 'LANG', useValue: 'en_US'},
        {provide: 'TRANSLATIONS', useValue: {'en_US': en}},
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
