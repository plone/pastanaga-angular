import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DemoModule } from './demo/demo.module';

const en = {
    'common': {
        'close': 'Close',
        'loading': 'Loading…',
        'dismiss': 'Dismiss',
        'select-all': 'Select all',
        'deselect-all': 'Deselect all',
        'expand': 'Expand',
        'collapse': 'Collapse',
        'reset': 'Reset',
        'yes': 'Yes',
        'no': 'No'
    },
    'demo-page': {
        'title': 'Pastanaga usage examples'
    }
};

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                DemoModule,
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                {provide: 'LANG', useValue: 'en_US'},
                {provide: 'TRANSLATIONS', useValue: {'en_US': en}},
            ]
        }).compileComponents();
    }));
    it('should render title in a h1 tag', (done) => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Pastanaga usage examples');
        done();
    });
});
