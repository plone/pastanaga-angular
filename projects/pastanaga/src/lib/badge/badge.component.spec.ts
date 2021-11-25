import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';
import { BrowserModule, By } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSvgIconModule, SvgLoader } from 'angular-svg-icon';
import { svgLoaderFactory } from '../test.utils';
import { TranslateModule } from '../translate/translate.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ButtonModule } from '../button/button.module';
import { AvatarModule } from '../avatar/avatar.module';
import { SvgModule } from '../svg/svg.module';
import { TRANSLATIONS } from '../translate/translate.pipe';
import { LANG } from '../translate/translate.service';

const en = {
    common: {
        close: 'Close',
        loading: 'Loading…',
        dismiss: 'Dismiss',
        'select-all': 'Select all',
        'deselect-all': 'Deselect all',
        expand: 'Expand',
        collapse: 'Collapse',
        reset: 'Reset',
        yes: 'Yes',
        no: 'No',
    },
    'demo-page': {
        title: 'Pastanaga usage examples',
    },
};

@Component({
    selector: 'test',
    template: ` <pa-badge (render)="onRender()">Pastanaga</pa-badge> `,
})
class Test1Component {
    isRendered = false;
    onRender() {
        this.isRendered = true;
    }
}

@Component({
    selector: 'test',
    template: ` <pa-badge [isSmall]="true">Pastanaga</pa-badge> `,
})
class Test2Component {}

@Component({
    selector: 'test',
    template: ` <pa-badge [isAccented]="true">Pastanaga</pa-badge> `,
})
class Test3Component {}

@Component({
    selector: 'test',
    template: ` <pa-badge color="destructive">Pastanaga</pa-badge> `,
})
class Test4Component {}

@Component({
    selector: 'test',
    template: ` <pa-badge hexaColor="#c0c0c0">Pastanaga</pa-badge> `,
})
class Test5Component {}

@Component({
    selector: 'test',
    template: ` <pa-badge [canBeRemoved]="true" (remove)="onRemoved()">Pastanaga</pa-badge> `,
})
class Test6Component {
    isRemoved = false;
    onRemoved() {
        this.isRemoved = true;
    }
}

@Component({
    selector: 'test',
    template: ` <pa-badge maxWidth="30px">A long long long long label</pa-badge> `,
})
class Test7Component {}

@Component({
    selector: 'test',
    template: ` <pa-badge [value]="10" [of]="100"></pa-badge> `,
})
class Test8Component {}

@Component({
    selector: 'test',
    template: ` <pa-badge [buttons]="[{ name: 'Ok' }]">Pastanaga</pa-badge> `,
})
class Test9Component {}

describe('BadgeComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                ButtonModule,
                AvatarModule,
                TooltipModule,
                TranslateModule,
                SvgModule,
                AngularSvgIconModule.forRoot({
                    loader: {
                        provide: SvgLoader,
                        useFactory: svgLoaderFactory,
                    },
                }),
            ],
            providers: [
                { provide: LANG, useValue: 'en_US' },
                { provide: TRANSLATIONS, useValue: { en_US: en } },
            ],
            declarations: [
                BadgeComponent,
                Test1Component,
                Test2Component,
                Test3Component,
                Test4Component,
                Test5Component,
                Test6Component,
                Test7Component,
                Test8Component,
                Test9Component,
            ],
        }).compileComponents();
    }));
    it('should emit when rendered', (done) => {
        const fixture = TestBed.createComponent(Test1Component);
        fixture.detectChanges();
        expect(fixture.componentInstance.isRendered).toBeTruthy();
        done();
    });
    it('should render a text in a badge', (done) => {
        const fixture = TestBed.createComponent(Test1Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge span').textContent).toContain('Pastanaga');
        done();
    });
    it('should render small badge', (done) => {
        const fixture = TestBed.createComponent(Test2Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge.pa-badge-small')).not.toBeNull();
        done();
    });
    it('should render accented badge', (done) => {
        const fixture = TestBed.createComponent(Test3Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge.pa-badge-accent')).not.toBeNull();
        done();
    });
    it('should render colored badge', (done) => {
        const fixture = TestBed.createComponent(Test4Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge.pa-badge-destructive')).not.toBeNull();
        done();
    });
    it('should render custom colors', (done) => {
        const fixture = TestBed.createComponent(Test5Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge').style.backgroundColor).toBe('rgb(192, 192, 192)');
        done();
    });
    it('should provide remove button', (done) => {
        const fixture = TestBed.createComponent(Test6Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge pa-button').textContent).toContain('Remove');
        done();
    });
    it('should emit when remove button is clicked', fakeAsync(() => {
        const fixture = TestBed.createComponent(Test6Component);
        fixture.detectChanges();
        fixture.debugElement.query(By.css('button')).nativeElement.click();
        tick();
        expect(fixture.componentInstance.isRemoved).toBeTruthy();
    }));
    it('should make an ellipsis if max width', (done) => {
        const fixture = TestBed.createComponent(Test7Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge .pa-badge-ellipsis').style.maxWidth).toBe('30px');
        done();
    });
    it('should render number values', (done) => {
        const fixture = TestBed.createComponent(Test8Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge').textContent).toBe('10/100');
        done();
    });
    it('should render buttons', (done) => {
        const fixture = TestBed.createComponent(Test9Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge button').textContent).toBe('Ok');
        done();
    });
});
