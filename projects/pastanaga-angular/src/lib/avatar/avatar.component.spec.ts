import { AvatarComponent } from './avatar.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AvatarComponent', () => {
    const createHost = createHostFactory({
        component: AvatarComponent,
    });

    let spectator: SpectatorHost<AvatarComponent>;

    it('should set user initials', () => {
        spectator = createHost(`<pa-avatar userName="Clark Kent"></pa-avatar>`);
        spectator.detectChanges();
        expect(spectator.component._initials).toEqual('CK');
    });

    it('should set default background color when no autoBackground', () => {
        spectator = createHost(`<pa-avatar userId="user1"></pa-avatar>`);
        spectator.detectChanges();
        const initials = spectator.query('.pa-avatar-initials');
        expect(initials).toBeTruthy();
        expect(initials?.className).toContain('pa-avatar-default');
    });

    it('should set an avatar color when autoBackground is set', () => {
        spectator = createHost(`<pa-avatar userId="user1" autoBackground></pa-avatar>`);
        spectator.detectChanges();
        const initials = spectator.query('.pa-avatar-initials');
        expect(initials).toBeTruthy();
        expect(initials?.className).toContain('pa-avatar-secondary');
    });

    it('should display a question mark as initials and set medium size by default', () => {
        spectator = createHost(`<pa-avatar></pa-avatar>`);
        spectator.detectChanges();
        expect(spectator.component._initials).toBe('?');
        expect(spectator.component._size).toBe('medium');
    });

    it('should set avatar size', () => {
        spectator = createHost(`<pa-avatar size="large"></pa-avatar>`);
        spectator.detectChanges();
        expect(spectator.component._size).toBe('large');
    });

    it('should set base64 image from imageSrc', () => {
        spectator = createHost(`<pa-avatar imageSrc="img64"></pa-avatar>`);
        spectator.detectChanges();
        expect(spectator.component._base64Image).toBe('img64');
    });

    it('should load blob image when set', fakeAsync(() => {
        const image = of(new Blob());
        spectator = createHost(`<pa-avatar [image]="image"></pa-avatar>`, {
            hostProps: { image },
        });
        spectator.detectChanges();
        expect(spectator.component._base64Image).toBe('');
    }));
});
