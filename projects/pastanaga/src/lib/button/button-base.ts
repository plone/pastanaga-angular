import { AfterContentInit, ElementRef, HostBinding, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

export class ButtonBase implements OnInit, AfterContentInit {
    @Input() color = 'primary';
    @Input() size: string;
    @Input() border: boolean;
    @Input() disabled: boolean;
    @Input() ariaLabel: string;
    @Input() icon: string;
    @Input() type: string;
    @Input() ariaControls: string;
    @Input() ariaExpanded: boolean;

    @ViewChild('text') textElement: ElementRef;

    colorClass: string;
    sizeClass: string;
    hasBorder: boolean;
    isDisabled: boolean;
    buttonLabel: string;

    ngAfterContentInit() {
        this.buttonLabel = this.textElement.nativeElement.textContent.trim();
        if (!this.ariaLabel) {
            this.ariaLabel = this.buttonLabel;
        }
    }

    ngOnInit() {
        this.colorClass = this.getButtonClass(this.color);
    }

    onChanges(changes: SimpleChanges) {
        if (changes.color && changes.color.currentValue) {
            this.colorClass = this.getClassFromInput('color', this.color, ['primary', 'secondary', 'destructive']);
        }

        if (changes.size && changes.size.currentValue) {
            this.sizeClass = this.getClassFromInput('size', this.size, ['small', 'large']);
        }

        if (changes.border) {
            this.hasBorder = this.isPropertyLikeTrue('border');
        }

        if (changes.disabled) {
            this.isDisabled = this.isPropertyLikeTrue('disabled');
        }
    }

    getClassFromInput(property: string, value: string, possibleValues: string[]): string {
        if (possibleValues.indexOf(value) === -1) {
            console.error(`Invalid ${property}: ${value}. Possible values: ${possibleValues.join(', ')}.`);
            return;
        }

        return this.getButtonClass(value);
    }

    getButtonClass(value: string) {
        return `o-button-${value}`;
    }

    isPropertyLikeTrue(property) {
        return typeof this[property] !== 'undefined' && this[property] !== null && this[property] !== false;
    }

    @HostBinding('style.pointer-events')
    public get disablePointerEvent(): String {
        return this.isDisabled ? 'none' : '';
    }
}
