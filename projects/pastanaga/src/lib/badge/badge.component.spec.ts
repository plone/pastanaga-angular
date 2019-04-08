import { TestBed, async } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';
import { BrowserModule } from '@angular/platform-browser';
import {
    ButtonModule,
    TooltipModule,
} from '../..';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'test',
    template: `
      <pa-badge>Pastanaga</pa-badge>
    `
})
class TestComponent { }

describe('BadgeComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                ButtonModule,
                TooltipModule,
            ],
            declarations: [
                BadgeComponent,
                TestComponent,
            ],
        }).compileComponents();
    }));
    it('should render a text in a badge', (done) => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-badge span').textContent).toContain('Pastanaga');
        done();
    });
});
