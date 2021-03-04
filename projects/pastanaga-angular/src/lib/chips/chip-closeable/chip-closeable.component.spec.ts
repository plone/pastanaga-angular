import { ChipCloseableComponent } from './chip-closeable.component';
import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { MockModule, ngMocks, MockedDebugElement } from 'ng-mocks';
import { AvatarComponent, ButtonComponent, PaAvatarModule, PaButtonModule } from '../../..';

@Component({ template: '' })
class TestComponent {
    avatar: any = { userName: 'the name' };
    noCloseButton = true;
    disabled = true;
    ariaRole = 'role';
    value = 'the value';

    onClose(event: any) {}
}

describe('ChipComponent Minimal', () => {
    let spectator: SpectatorHost<ChipCloseableComponent, TestComponent>;
    let component: ChipCloseableComponent;
    let closeButton: MockedDebugElement<ButtonComponent>;
    const createHost = createHostFactory({
        component: ChipCloseableComponent,
        host: TestComponent,
        imports: [MockModule(PaButtonModule), MockModule(PaAvatarModule)],
    });

    beforeEach(() => {
        spectator = createHost(
            `<pa-chip-closeable [value]="value" (closed)="onClose($event)">A chip</pa-chip-closeable>`,
        );
        component = spectator.component;
        closeButton = ngMocks.find(spectator.debugElement, ButtonComponent);
    });

    it('should have an enabled close button by default', () => {
        expect(closeButton.attributes.aspect).toEqual('basic');
        expect(closeButton.attributes.icon).toEqual('cross-small');
        expect(closeButton.attributes.kind).toEqual('secondary');
        expect(closeButton.attributes.size).toEqual('xsmall');
        expect(closeButton.attributes['ng-reflect-disabled']).toEqual('false');
    });

    it('should notify the value when button clicked', () => {
        const closed = jest.spyOn(spectator.hostComponent, 'onClose');
        const mouseEvent = new MouseEvent('click');
        spectator.dispatchMouseEvent(closeButton, 'click', 0, 0, mouseEvent);
        expect(closed).toHaveBeenCalledWith({ event: mouseEvent, value: 'the value' });
    });
});

describe('ChipComponent Avatar noClose', () => {
    let spectator: SpectatorHost<ChipCloseableComponent, TestComponent>;
    let component: ChipCloseableComponent;
    let avatar: MockedDebugElement<AvatarComponent>;
    const createHost = createHostFactory({
        component: ChipCloseableComponent,
        host: TestComponent,
        imports: [MockModule(PaButtonModule), MockModule(PaAvatarModule)],
    });

    beforeEach(() => {
        spectator = createHost(`<pa-chip-closeable [avatar]="avatar" noCloseButton>A chip</pa-chip-closeable>`);
        component = spectator.component;
        avatar = ngMocks.find(spectator.debugElement, AvatarComponent);
    });

    it('should have an avatar and no close button', () => {
        expect(avatar).toBeTruthy();
        const button = spectator.query('.pa-close-chip-button');
        expect(button).toEqual(null);
    });
});
