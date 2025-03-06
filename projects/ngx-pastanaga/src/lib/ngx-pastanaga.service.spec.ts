import { TestBed } from '@angular/core/testing';

import { NgxPastanagaService } from './ngx-pastanaga.service';

describe('NgxPastanagaService', () => {
  let service: NgxPastanagaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPastanagaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
