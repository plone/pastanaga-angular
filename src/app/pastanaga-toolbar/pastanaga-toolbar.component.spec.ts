import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RESTAPIModule } from '@plone/restapi-angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
} from '@angular/material';
import { IconsModule } from '../icons/icons.module';

import { PastanagaToolbarComponent } from './pastanaga-toolbar.component';

describe('PastanagaToolbarComponent', () => {
  let component: PastanagaToolbarComponent;
  let fixture: ComponentFixture<PastanagaToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PastanagaToolbarComponent,
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        IconsModule,
        BrowserAnimationsModule,
        RESTAPIModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: 'CONFIGURATION', useValue: {
            BACKEND_URL: 'http://fake/Plone',
          }
        },
      ],
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastanagaToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
