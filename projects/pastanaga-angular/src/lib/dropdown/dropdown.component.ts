import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
} from '@angular/core';
import { PopupComponent, PopupService } from '../popup';

@Component({
    selector: 'pa-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent extends PopupComponent implements OnInit, OnDestroy {
    @Input()
    set role(value: 'listbox' | 'menu') {
        this._role = value || 'menu';
        this.popupType = value !== 'menu' ? 'dropdown' : 'menu';
    }
    get role(): 'listbox' | 'menu' {
        return this._role;
    }

    private _role: 'listbox' | 'menu' = 'menu';

    constructor(
        protected override popupService: PopupService,
        protected override renderer: Renderer2,
        protected override element: ElementRef,
        protected override cdr: ChangeDetectorRef,
    ) {
        super(popupService, renderer, element, cdr);
        this.popupType = 'menu';
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
    }
}
