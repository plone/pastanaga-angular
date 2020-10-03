import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    RendererFactory2,
    ViewChild,
} from '@angular/core';
import { timer, pipe } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import { ToastConfig, ToastType } from './toast.model';

const TOAST_DEFAULT = 3000;
const TOAST_BUTTON = 5000;
const TOAST_ANIMATE_OUT = 400;

@Component({
    selector: 'pa-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit, AfterViewInit {
    @ViewChild('toastWrapper', { read: ElementRef }) toastWrapper?: ElementRef;

    private renderer: Renderer2;

    @Input()
    set id(value: string) {
        this._id = value;
    }

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
    }

    @Output() dismiss = new EventEmitter<string>();

    _id: string = '';
    _icon?: string;
    _actionButtonLabel?: string;
    _action?: () => any;
    _class = '';

    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    ngOnInit(): void {
        this.setupAutoClause();
    }

    ngAfterViewInit() {
        this.addClass(`${this._class}-wrapper`, this.toastWrapper);
    }

    setupAutoClause() {
        const DELAY = !this._actionButtonLabel ? TOAST_DEFAULT : TOAST_BUTTON;
        timer(DELAY)
            .pipe(
                take(1),
                tap(() => {
                    this.addClass('pa-toast-animate-out', this.toastWrapper);
                }),
                switchMap(() => timer(TOAST_ANIMATE_OUT))
            )
            .subscribe(() => this.dismiss.emit(this._id));
    }

    onAction() {
        if (this._action) {
            this._action();
        }
        this.dismiss.emit(this._id);
    }

    private addClass(cssClass: string, element?: ElementRef) {
        if (!!element) {
            this.renderer.addClass(element.nativeElement, cssClass);
        }
    }
}
