import {
    AfterContentInit,
    ChangeDetectorRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewChild,
    ViewRef
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

const COLORS = ['primary', 'secondary', 'destructive', 'contrast'];
const SIZES = ['tiny', 'small', 'large'];

export class ButtonBase implements AfterContentInit {
    @Input() set color(value: 'primary' | 'secondary' | 'destructive' | 'contrast') {
        if (!!value) {
            const buttonStyles = {...this.buttonStyle};
            COLORS.forEach(color => {
                const colorClass = this.getClassFromInput('color', color, COLORS);
                buttonStyles[colorClass] = color === value;
            });
            this.buttonStyle = buttonStyles;
        }
    }
    @Input() set size(value: 'tiny' | 'small' | 'large' | '') {
        if (!!value) {
            const buttonStyles = {...this.buttonStyle};
            SIZES.forEach(size => {
                const sizeClass = this.getClassFromInput('size', size, SIZES);
                buttonStyles[sizeClass] = size === value;
            });
            this.buttonStyle = buttonStyles;
        }
    }
    @Input() set border(value) {
        this.buttonStyle['pa-button-accent'] = coerceBooleanProperty(value);
    }

    @Input() set disabled(value) {
        this.isDisabled = coerceBooleanProperty(value);
    }

    @Input() set active(value) {
        this.buttonStyle['active'] = coerceBooleanProperty(value);
    }
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

    @ViewChild('text', {static: false}) textElement?: ElementRef;

    _iconAndText = false;
    checkedType = 'button';

    buttonStyle = {
        'pa-button': true,
        'pa-button-primary': true,
        'pa-button-secondary': false,
        'pa-button-destructive': false,
        'pa-button-contrast': false,
        'pa-button-small': false,
        'pa-button-large': false,
        'pa-button-accent': false,
        'pa-button-link': false,
        'active': false,
    };
    isDisabled = false;

    constructor(protected changeDetector: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        setTimeout(() => {
            if (!!this.textElement && !this.ariaLabel && !!this.changeDetector && !(this.changeDetector as ViewRef).destroyed) {
                this.ariaLabel = this.textElement.nativeElement.textContent.trim();
                this.changeDetector.detectChanges();
            }
        }, 0);
    }

    getClassFromInput(property: string, value: string, possibleValues: string[]): string {
        if (possibleValues.indexOf(value) === -1) {
            console.error(`Invalid ${property}: ${value}. Possible values: ${possibleValues.join(', ')}.`);
            return '';
        }

        return this.getButtonClass(value);
    }

    getButtonClass(value: string) {
        return `pa-button-${value}`;
    }

    @HostBinding('style.pointer-events')
    public get disablePointerEvent(): String {
        return this.isDisabled ? 'none' : '';
    }
}
