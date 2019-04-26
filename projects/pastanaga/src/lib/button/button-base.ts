import {AfterContentInit, ElementRef, EventEmitter, HostBinding, Input, Output, SimpleChanges, ViewChild} from '@angular/core';

const COLORS = ['primary', 'secondary', 'destructive', 'contrast'];
const SIZES = ['tiny', 'small', 'large'];

export class ButtonBase implements AfterContentInit {
    @Input() color: 'primary'|'secondary'|'destructive'|'contrast' = 'primary';
    @Input() size: 'tiny'|'small'|'large'|'' = '';
    @Input() border = false;
    @Input() disabled = false;
    @Input() ariaLabel = '';
    @Input() icon = '';
    @Input() type = '';
    @Input() ariaControls = '';
    @Input() ariaExpanded = false;

    @Output() hasFocus: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('text') textElement?: ElementRef;

    buttonStyle = {
        'pa-button': true,
        'pa-button-primary': true,
        'pa-button-secondary': false,
        'pa-button-destructive': false,
        'pa-button-small': false,
        'pa-button-large': false,
        'pa-button-accent': false,
        'pa-button-link': false,
        'active': false,
    };
    isDisabled = false;
    buttonLabel = '';

    ngAfterContentInit() {
        setTimeout(() => {
            if (!!this.textElement) {
                this.buttonLabel = this.textElement.nativeElement.textContent.trim();
                if (!this.ariaLabel) {
                    this.ariaLabel = this.buttonLabel;
                }
            }
        }, 0);
    }

    onChanges(changes: SimpleChanges) {
        if (changes.color && changes.color.currentValue) {
            COLORS.forEach(color => {
                const colorClass = this.getClassFromInput('color', color, COLORS);
                this.buttonStyle[colorClass] = color === changes.color.currentValue;
            });
        }

        if (changes.size && changes.size.currentValue) {
            SIZES.forEach(size => {
                const sizeClass = this.getClassFromInput('size', size, SIZES);
                this.buttonStyle[sizeClass] = size === changes.size.currentValue;
            });
        }

        if (changes.border) {
            this.buttonStyle['pa-button-accent'] = this.isPropertyLikeTrue('border');
        }

        if (changes.active) {
            this.buttonStyle['active'] = this.isPropertyLikeTrue('active');
        }

        if (changes.disabled) {
            this.isDisabled = this.isPropertyLikeTrue('disabled');
        }
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

    isPropertyLikeTrue(property) {
        return typeof this[property] !== 'undefined' && this[property] !== null && this[property] !== false;
    }

    @HostBinding('style.pointer-events')
    public get disablePointerEvent(): String {
        return this.isDisabled ? 'none' : '';
    }
}
