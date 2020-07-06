import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastConfig, ToastType } from './toast.model';

const DEFAULT_DELAY = 5000;

@Component({
    selector: 'pa-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {

    @Input()
    set id(value: string) {
        this._id = value;
    };

    @Input() message = '';

    @Input() set type(value: ToastType) {
        this._class = `pa-toast-${value}`;
    }

    @Input()
    set config(value: ToastConfig) {
        if (!!value) {
            this._action = value.action;
            this._actionButtonLabel = value.buttonLabel;
            this._icon = value.icon;
        }
    };


    @Output() dismiss = new EventEmitter<string>();

    _id: string = '';
    _icon?: string;
    _actionButtonLabel?: string;
    _action?: () => any;
    _class = '';

    constructor() {
    }

    ngOnInit(): void {
        this.setupAutoClause();
    }

    setupAutoClause() {
        setTimeout(() => this.dismiss.emit(this._id), DEFAULT_DELAY);
    }

    onAction() {
        if (this._action) {
            this._action();
        }
        this.dismiss.emit(this._id);
    }

}
