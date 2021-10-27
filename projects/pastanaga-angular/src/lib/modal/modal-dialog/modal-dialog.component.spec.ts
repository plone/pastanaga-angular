import { ModalDialogComponent } from './modal-dialog.component';
import {
    ModalDescriptionDirective,
    ModalFooterDirective,
    ModalImageDirective,
    ModalTitleDirective,
} from '../modal.directive';
import { MockDirective, MockModule } from 'ng-mocks';
import { PaButtonModule } from '../../button';
import { ModalConfig, ModalRef } from '../modal.model';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { BreakpointObserver, ViewportMode } from '../../breakpoint-observer';
import { of } from 'rxjs';

describe('DialogComponent', () => {
    const createHost = createHostFactory({
        imports: [MockModule(PaButtonModule)],
        component: ModalDialogComponent,
        declarations: [
            MockDirective(ModalTitleDirective),
            MockDirective(ModalDescriptionDirective),
            MockDirective(ModalFooterDirective),
            MockDirective(ModalImageDirective),
        ],
        providers: [
            { provide: ModalRef, useValue: new ModalRef({ id: 0, config: new ModalConfig() }) },
            {
                provide: BreakpointObserver,
                useValue: {
                    currentMode: of('desktop' as ViewportMode)
                }
            }
        ],
        detectChanges: false
    });

    let spectator: SpectatorHost<ModalDialogComponent>;
    let component: ModalDialogComponent;

    it(`should hide image container by default`, () => {
        spectator = createHost(`<pa-modal-dialog>
            <pa-modal-title>Dialog title</pa-modal-title>
            <pa-modal-description>Dialog description</pa-modal-description>
            <pa-modal-footer>
                <pa-button kind="secondary" (click)="modal.close('from secondary')">Secondary CTA</pa-button>
                <pa-button kind="primary" (click)="modal.close('from primary')">Primary CTA</pa-button>
            </pa-modal-footer>
        </pa-modal-dialog>`);
        component = spectator.component;
        spectator.detectChanges();
        expect(component.hasImage).toBe(false);
    });

    it(`should display image container when pa-modal-image is present`, () => {
        spectator = createHost(`<pa-modal-dialog>
        <pa-modal-image><img src="assets/ninja.svg" alt="ninja" /></pa-modal-image>
        <pa-modal-title>Dialog title</pa-modal-title>
        <pa-modal-description>Dialog description</pa-modal-description>
        <pa-modal-footer>
            <pa-button kind="secondary" (click)="modal.close('from secondary')">Secondary CTA</pa-button>
            <pa-button kind="primary" (click)="modal.close('from primary')">Primary CTA</pa-button>
        </pa-modal-footer>
    </pa-modal-dialog>`);
        component = spectator.component;
        spectator.detectChanges();

        expect(component.hasImage).toBe(true);
    });
});
