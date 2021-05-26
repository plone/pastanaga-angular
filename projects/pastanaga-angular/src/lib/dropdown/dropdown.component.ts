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
    }
    get role(): 'listbox' | 'menu' {
        return this._role;
    }

    private _role: 'listbox' | 'menu' = 'menu';

    constructor(
        public popupService: PopupService,
        public renderer: Renderer2,
        public element: ElementRef,
        public cdr: ChangeDetectorRef,
    ) {
        super(popupService, renderer, element, cdr);
        this.popupType = 'dropdown';
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
