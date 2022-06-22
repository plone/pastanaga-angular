import { formatTranslationEntries } from './translate.utils';

describe('Translate utils', () => {
    describe('formatTranslationEntries', () => {
        const hierarchical = {pastanaga: {calendar: {months: 'Months', years: 'Years'}}};
        const flatten = {
            'pastanaga.cancel': 'Cancel',
            'pastanaga.close': 'Close',
        };
        const mixed = {...hierarchical, ...flatten};
        const hierarchicalToFlatten = {
            'pastanaga.calendar.months': 'Months',
            'pastanaga.calendar.years': 'Years',
        };
        const convertedMixes = {...hierarchicalToFlatten, ...flatten};

        it('should flatten hierarchical entries', () => {
            expect(formatTranslationEntries(hierarchical)).toEqual(hierarchicalToFlatten);
        });

        it('should keep flatten entries as they are', () => {
            expect(formatTranslationEntries(flatten)).toEqual(flatten);
        });

        it('should flatten mixed entries', () => {
            expect(formatTranslationEntries(mixed)).toEqual(convertedMixes);
        });
    });
});
