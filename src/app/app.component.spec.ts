import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RESTAPIModule } from '@plone/restapi-angular';
import { FormsModule } from '@angular/forms';
import {
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { IconsModule } from './icons/icons.module';

import { PastanagaService } from './service';
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

@Component({
  selector: 'app-pastanaga-message',
  template: ''
})
export class FakeMessage { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FakeToolbar,
        FakeHome,
        FakeMessage,
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
        RESTAPIModule,
      ],
      providers: [
        PastanagaService,
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

    TestBed.compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
