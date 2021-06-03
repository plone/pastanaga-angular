import {
    AfterContentInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    ViewRef
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';


@Directive()
export class ButtonBase implements AfterContentInit, OnChanges {
    @Input() color?: 'primary' | 'secondary' | 'destructive' | 'contrast';
    @Input() size?: 'tiny' | 'small' | 'large' | '';
    @Input() set border(value) {
        this._hasBorder = coerceBooleanProperty(value);
    }
    private _hasBorder = false;

    @Input() set disabled(value) {
        this.isDisabled = coerceBooleanProperty(value);
    }

    @Input() set active(value) {
        this._isActive = coerceBooleanProperty(value);
    }
    private _isActive = false;

    @Input() ariaLabel = '';
    @Input() icon = '';
    @Input() set type(value) {
        if (!!value && ['button', 'submit', 'reset'].indexOf(value) !== -1) {
            this.checkedType = value;
        }
    }
    @Input() ariaControls = '';
    @Input() ariaExpanded = false;
    @Input()
    get iconAndText(): boolean {
        return this._iconAndText;
    }
    set iconAndText(value: boolean) {
        this._iconAndText = coerceBooleanProperty(value);
    }

    @Output() hasFocus: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('text') textElement?: ElementRef;

    _iconAndText = false;
    checkedType = 'button';

    buttonStyle = {
        'pa-button': true,
        'pa-button-primary': true,
        'pa-button-secondary': false,
        'pa-button-destructive': false,
        'pa-button-contrast': false,
        'pa-button-tiny': false,
        'pa-button-small': false,
        'pa-button-large': false,
        'pa-button-accent': false,
        'pa-button-text': false,
        'active': false,
    };
    isDisabled = false;

    constructor(protected changeDetector: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.buttonStyle = {
            'pa-button': true,
            'pa-button-primary': !this.color || this.color === 'primary',
            'pa-button-secondary': this.color === 'secondary',
            'pa-button-destructive': this.color === 'destructive',
            'pa-button-contrast': this.color === 'contrast',
            'pa-button-tiny': this.size === 'tiny',
            'pa-button-small': this.size === 'small',
            'pa-button-large': this.size === 'large',
            'pa-button-accent': this._hasBorder,
            'pa-button-text': !this.icon || this._iconAndText,
            'active': this._isActive,
        };
    }

    ngAfterContentInit() {
        setTimeout(() => {
            if (!!this.textElement && !this.ariaLabel && !!this.changeDetector && !(this.changeDetector as ViewRef).destroyed) {
                this.ariaLabel = this.textElement.nativeElement.textContent.trim();
                this.changeDetector.detectChanges();
            }
        }, 0);
    }

    @HostBinding('style.pointer-events')
    public get disablePointerEvent(): string {
        return this.isDisabled ? 'none' : '';
    }
}
