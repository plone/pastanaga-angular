import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { Aspect, detectChanges, Kind, Size } from '../common';

@Component({
    selector: 'pa-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements AfterContentInit {
    @Input() set kind(value: Kind) {
        if (!!value) {
            this._kind = value;
        }
    }
    @Input() set size(value: Size) {
        if (!!value) {
            this._size = value;
            switch (this._size) {
                case 'large':
                    this._iconSize = 'large';
                    break;
                case 'medium':
                case 'small':
                    this._iconSize = 'medium';
                    break;
            }
        }
    }
    @Input() set aspect(value: Aspect) {
        if (!!value) {
            this._aspect = value;
        }
    }
    @Input() set type(value: 'button' | 'submit' | 'reset') {
        if (!!value) {
            this._type = value;
        }
    }
    @Input() set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }
    @Input() set active(value: any) {
        this._active = coerceBooleanProperty(value);
    }
    @Input() set icon(value: string) {
        this._icon = value || '';
    }
    @Input() set iconAndText(value: any) {
        this._iconAndText = coerceBooleanProperty(value);
    }

    @ViewChild('textContainer') textContainer?: ElementRef;

    _type: 'button' | 'submit' | 'reset' = 'button';
    _kind: Kind = 'secondary';
    _size: Size = 'medium';
    _aspect: Aspect = 'solid';
    _icon = '';
    _iconSize: Size = 'medium';
    _iconAndText = false;

    // state
    _disabled = false;
    _active = false;

    // accessibility
    _ariaLabel = '';

    constructor(protected cdr: ChangeDetectorRef) {}

    ngAfterContentInit() {
        setTimeout(() => {
            if (!!this.textContainer) {
                this._ariaLabel = this.textContainer.nativeElement.textContent.trim();
                detectChanges(this.cdr);
            }
        }, 0);
    }

    onClick($event: MouseEvent) {
        if (!!$event && this._type !== 'submit') {
            $event.preventDefault();
        }
    }

    clickOnWrapper($event: MouseEvent) {
        if (this._disabled) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }
}
