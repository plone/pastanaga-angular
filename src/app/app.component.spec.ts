import { TestBed, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RESTAPIModule } from '@plone/restapi-angular';
import {
  MatListModule,
  MatIconModule,
} from '@angular/material';
import { IconsModule } from './icons/icons.module';

import { AppComponent } from './app.component';

@Component({
  selector: 'app-pastanaga-toolbar',
  template: ''
})
export class FakeToolbar { }

@Component({
  selector: 'app-pastanaga-home',
  template: ''
})
export class FakeHome { }

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FakeToolbar,
        FakeHome,
      ],
      imports: [
        HttpClientTestingModule,
        MatListModule,
        MatIconModule,
        IconsModule,
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

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [FakeHome],
      },
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});