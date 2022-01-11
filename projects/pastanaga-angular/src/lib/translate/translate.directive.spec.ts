import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';
import { ElementRef } from '@angular/core';
import { TranslateService } from './translate.service';

class MockElementRef implements ElementRef {
    nativeElement = {};
}

const obj1 = { common: 1, second: 2 };
const obj2 = { common: 1, color: 'blue' };
const obj3 = { common: 1, second: 3 };

describe('TranslateDirective', () => {
    let directive: TranslateDirective;

    beforeEach(() => {
        directive = new TranslateDirective(
            new MockElementRef(),
            new TranslatePipe(new TranslateService('en_US'), {}),
        );
    });

    describe('areEquals', () => {
        it('should be false when testing 2 objects with a different property ', () => {
            expect(directive.areEquals(obj1, obj2)).toBe(false);
        });

        it('should be true when testing 2 equal objects ', () => {
            expect(directive.areEquals(obj1, obj1)).toBe(true);
        });

        it('should be false when testing 2 objects with a different property value ', () => {
            expect(directive.areEquals(obj1, obj3)).toBe(false);
        });
    });
});


