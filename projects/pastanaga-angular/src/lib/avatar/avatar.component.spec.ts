import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AvatarComponent } from './avatar.component';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../testing';
import { PaIconModule } from '../icon/icon.module';

@Component({
    template: `<pa-avatar #avatar
    [userId]="userId"
    [userName]="userName"
    [icon]="icon"
></pa-avatar>`,
})
export class TestComponent {
    userId = '';
    userName = '';
    icon = '';
    @ViewChild('avatar') avatar?: AvatarComponent;
}

describe('AvatarComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ...TESTING_IMPORTS,
                PaIconModule,
            ],
            providers: [
                ...TESTING_PROVIDERS,
            ],
            declarations: [AvatarComponent, TestComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set an avatar color', () => {
        component.userId = 'user1';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.pa-avatar-default')).properties.className).toContain('pa-avatar-lime');
    });

    it('should set user initials', () => {
        component.userName = 'Clark Kent';
        fixture.detectChanges();
        expect(component.avatar?._initials).toEqual('CK');
    });

    it('should set icon with proper size', () => {
        expect(fixture.debugElement.query(By.css('svg.pa-medium'))).toBeFalsy();
        component.icon = 'search';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('svg.pa-medium'))).toBeTruthy();
        component.userName = 'Clark Kent';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('svg.pa-xxsmall'))).toBeTruthy();
    });
});
