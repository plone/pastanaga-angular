import { TestBed } from '@angular/core/testing';

import { TextFieldUtilityService } from './text-field-utility.service';

describe('TextFieldUtilityService', () => {
    let service: TextFieldUtilityService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TextFieldUtilityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
