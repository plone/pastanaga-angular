import {} from 'jest';
import { getInitials } from './avatar.utils';

describe('Avatar utils', () => {
    describe('getInitials', () => {
        it(`should return the first letter of the two first words of username`, () => {
            expect(getInitials('John Doe')).toBe('JD');
        });

        it(`should return the first two letters of username if it's one word only`, () => {
            expect(getInitials('John')).toBe('Jo');
        });

        it(`should not return special characters`, () => {
            expect(getInitials('@John Do')).toBe('JD');
            expect(getInitials('ॷॹ-ॿঅ-ঌএঐও নপ-রলশ-হঽ')).toBe('ॷন');
        });
    });
});
