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
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../popup/popup.service';

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
        protected popupService: PopupService,
        protected renderer: Renderer2,
        protected element: ElementRef,
        protected cdr: ChangeDetectorRef,
    ) {
        super(popupService, renderer, element, cdr);
        this.popupType = 'menu';
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
