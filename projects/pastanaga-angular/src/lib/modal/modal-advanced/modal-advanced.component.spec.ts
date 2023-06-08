import { ModalAdvancedComponent } from './modal-advanced.component';
import { PaButtonModule } from '../../button/button.module';
import { ModalConfig, ModalRef } from '../modal.model';
import { MockModule, MockPipe } from 'ng-mocks';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PaTranslateModule, TranslatePipe } from '../../translate';

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = ResizeObserver;
describe('ModalComponent', () => {
    const title = 'Modal advanced title';
    const createComponent = createComponentFactory({
        imports: [MockModule(PaButtonModule), MockModule(PaTranslateModule)],
        component: ModalAdvancedComponent,
        declarations: [MockPipe(TranslatePipe, (value) => `translate--${value}`)],
        providers: [
            {
                provide: ModalRef,
                useValue: new ModalRef({
                    id: 0,
                    config: new ModalConfig({ data: { title } }),
                }),
            },
        ],
        detectChanges: false,
    });
    let spectator: Spectator<ModalAdvancedComponent>;
    let component: ModalAdvancedComponent;
    let modalRef: ModalRef;

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
        modalRef = spectator.inject(ModalRef);
    });

    describe('ngAfterViewInit', () => {
        it('should setFocus and refresh on ngAfterViewInit', () => {
            component.setFocus = jest.fn();
            component.refresh = jest.fn();

            component.ngAfterViewInit();

            expect(component.setFocus).toHaveBeenCalled();
            expect(component.refresh).toHaveBeenCalled();
        });
    });
});
