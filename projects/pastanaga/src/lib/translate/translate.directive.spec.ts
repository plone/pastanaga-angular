import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';
import { ElementRef } from '@angular/core'; 
class MockElementRef implements ElementRef {
    nativeElement = {};
}
const obj1 = {common: 1, second: 2};
const obj2 = {common: 1, color: 'blue' };
const obj3 = {common: 1, second: 3};

describe('TranslateDirective', () => {
  it('should create an instance', () => {
    const directive = new TranslateDirective(new MockElementRef(), new TranslatePipe({}));
    expect(directive).toBeTruthy();
  });
});

describe('Testing compareObj method', () => {
    it('Sending 2 objects with a different property should be false', () => {
      const directive = new TranslateDirective(new MockElementRef(), new TranslatePipe({}));
      expect(directive.compareObj(obj1, obj2)).toBe(false);
    });

    it('Sending 2 equal objects should be true', () => {
        const directive = new TranslateDirective(new MockElementRef(), new TranslatePipe({}));
        expect(directive.compareObj(obj1, obj1)).toBe(true);
    });

    it('Sending 2 objects with a different property value should be false', () => {
        const directive = new TranslateDirective(new MockElementRef(), new TranslatePipe({}));
        expect(directive.compareObj(obj1, obj3)).toBe(false);
    });

});