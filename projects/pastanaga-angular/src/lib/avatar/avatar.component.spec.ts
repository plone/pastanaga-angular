import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AvatarComponent } from './avatar.component';
import { PaIconModule } from '../icon/icon.module';
import { MockModule } from 'ng-mocks';

@Component({
    template: `<pa-avatar
        #avatar
        [userId]="userId"
        [userName]="userName"
        [icon]="icon"
        [autoBackground]="true"
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
            imports: [MockModule(PaIconModule)],
            providers: [],
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
        expect(fixture.debugElement.query(By.css('.pa-avatar-initials')).properties.className).toContain(
            'pa-avatar-lime'
        );
    });

    it('should set user initials', () => {
        component.userName = 'Clark Kent';
        fixture.detectChanges();
        expect(component.avatar?._initials).toEqual('CK');
    });

    it('should set icon with proper size', () => {
        expect(fixture.debugElement.query(By.css('.pa-avatar-no-info-icon pa-icon'))).toBeFalsy();
        component.icon = 'search';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.pa-avatar-no-info-icon pa-icon'))).toBeTruthy();
        component.userName = 'Clark Kent';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.pa-avatar-user-icon'))).toBeTruthy();
    });
});
