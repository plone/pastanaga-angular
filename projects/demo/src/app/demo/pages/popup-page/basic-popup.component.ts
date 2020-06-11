import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PastanagaService, PopupComponent } from '../../../../../../pastanaga-angular/src';

@Component({
    selector: 'pa-demo-basic-popup',
    template: `
        <div class="pa-popup" [hidden]="!_isDisplayed" [ngStyle]="_style">
            <div class="pa-popup-wrapper">
                <p>
                    basic-popup works!
                </p>
            </div>
        </div>
    `,
    styles: [`
        p {margin: 0;}
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPopupComponent extends PopupComponent implements OnInit {

    constructor(
        public pastanaga: PastanagaService,
        public renderer: Renderer2,
        public element: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        super(pastanaga.popupService, renderer, element, cdr);
    }

    ngOnInit(): void {
    }

}
