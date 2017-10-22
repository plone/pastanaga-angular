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
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { IconsModule } from '../icons/icons.module';

import { PastanagaLoginComponent } from './pastanaga-login.component';

describe('PastanagaLoginComponent', () => {
  let component: PastanagaLoginComponent;
  let fixture: ComponentFixture<PastanagaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PastanagaLoginComponent,
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
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
    fixture = TestBed.createComponent(PastanagaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
