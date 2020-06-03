import { TestBed } from '@angular/core/testing';

import { PastanagaService } from './pastanaga.service';

describe('PastanagaService', () => {
    let service: PastanagaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PastanagaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
