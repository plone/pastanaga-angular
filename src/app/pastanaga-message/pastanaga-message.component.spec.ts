import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import {
  MatIconModule,
} from '@angular/material';
import { RESTAPIModule } from '@plone/restapi-angular';

import { IconsModule } from '../icons/icons.module';

import { PastanagaService } from '../service';
import { PastanagaMessageComponent } from './pastanaga-message.component';

describe('PastanagaMessageComponent', () => {
  let component: PastanagaMessageComponent;
  let fixture: ComponentFixture<PastanagaMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastanagaMessageComponent ],
      imports: [
        MatIconModule,
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastanagaMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
