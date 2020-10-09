import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { By } from '@angular/platform-browser';
import { Size } from '../common';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { mockProvider } from '@ngneat/spectator/jest';

describe('IconComponent', () => {
    let component: IconComponent;
    let fixture: ComponentFixture<IconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [mockProvider(SvgIconRegistryService)],
            declarations: [IconComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the proper sprite', () => {
        component.name = 'plus';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('svg use')).attributes['xlink:href']).toEqual(
            'assets/glyphs-sprite.svg#plus'
        );
    });

    it('should set the proper size', () => {
        component.name = 'plus';
        component.size = Size.small;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('svg')).attributes.class).toEqual('pa-small');
    });
});
