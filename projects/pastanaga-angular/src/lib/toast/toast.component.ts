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
import { timer } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import { ToastButton, ToastConfig, ToastType } from './toast.model';

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
    get id() {
        return this._id;
    }

    @Input() message = '';

    @Input() set type(value: ToastType) {
        this._class = `pa-toast-${value}`;
    }

    @Input()
    set config(conf: ToastConfig) {
        if (!!conf) {
            this._icon = conf.icon;
            this._actionButton = conf.button;
            this.translateParams = conf.translateParams;
        }
    }

    @Output() dismiss = new EventEmitter<string>();

    get icon() {
        return this._icon;
    }
    get actionButton() {
        return this._actionButton;
    }
    get class() {
        return this._class;
    }
    private _id = '';
    private _icon?: string;
    private _actionButton?: ToastButton;
    private _class = '';
    translateParams?: { [key: string]: string | number };

    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    ngOnInit(): void {
        this.setupAutoClause();
    }

    ngAfterViewInit() {
        this.addClass(`${this.class}-wrapper`, this.toastWrapper);
    }

    setupAutoClause() {
        const DELAY = !this._actionButton ? TOAST_DEFAULT : TOAST_BUTTON;
        timer(DELAY)
            .pipe(
                take(1),
                tap(() => {
                    this.addClass('pa-toast-animate-out', this.toastWrapper);
                }),
                switchMap(() => timer(TOAST_ANIMATE_OUT)),
            )
            .subscribe(() => this.dismiss.emit(this.id));
    }

    onAction() {
        if (this._actionButton) {
            this._actionButton.action();
        }
        this.dismiss.emit(this.id);
    }

    private addClass(cssClass: string, element?: ElementRef) {
        if (!!element) {
            this.renderer.addClass(element.nativeElement, cssClass);
        }
    }
}
