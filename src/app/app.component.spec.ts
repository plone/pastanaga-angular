import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  BadgeModule,
  ButtonModule,
  ControlsModule,
  ProgressModule,
  ToasterModule,
  TooltipModule,
  TextFieldModule,
} from '../../projects/pastanaga/src';
import { Observable, of } from 'rxjs';

class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
      return of({});
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: CustomLoader}
        }),
        BadgeModule,
        ButtonModule,
        ControlsModule,
        ProgressModule,
        ToasterModule.forRoot(),
        TextFieldModule,
        TooltipModule,
    ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should render title in a h1 tag', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('demo-page.title');
    done();
  });
});
