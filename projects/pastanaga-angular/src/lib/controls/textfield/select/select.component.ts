import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { BaseTextField } from '../base-text-field';

@Component({
    selector: 'pa-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends BaseTextField implements AfterContentInit, OnInit, OnDestroy {
    @Input()
    get label(): string { return this._label || ''; }
    set label(value: string) { this._label = value; }

    _fieldType = 'dropdown';

    constructor(
        protected cdr: ChangeDetectorRef,
    ) {
        super(cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
