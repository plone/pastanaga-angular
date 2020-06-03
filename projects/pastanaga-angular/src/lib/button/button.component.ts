import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { detectChanges, Kind, markForCheck, Size, Weight } from '../common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;

@Component({
    selector: 'pa-button',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements AfterContentInit, OnInit {
    @Input() id?: string;
    @Input() set kind(value: Kind) {
        if (!!value) {
            this._kind = value;
        }
    }
    @Input() set size(value: Size) {
        if (!!value) {
            this._size = value;
        }
    }
    @Input() set weight(value: Weight) {
        if (!!value) {
            this._weight = value;
        }
    }
    @Input() set type(value: 'button' | 'submit' | 'reset') {
        if (!!value) {
            this._type = value;
        }
    }
    @Input() set disabled(value) { this._disabled = coerceBooleanProperty(value); }

    @ViewChild('textContainer') textContainer?: ElementRef;

    _id = '';
    _type: 'button' | 'submit' | 'reset' = 'button';
    _kind: Kind = Kind.secondary;
    _size: Size = Size.medium;
    _weight: Weight = Weight.regular;

    // state
    _disabled = false;

    // accessibility
    _ariaLabel = '';

    constructor(
        protected cdr: ChangeDetectorRef,
    ) {
    }

    ngAfterContentInit() {
        setTimeout(() => {
            if (!!this.textContainer) {
                this._ariaLabel = this.textContainer.nativeElement.textContent.trim();
                detectChanges(this.cdr);
            }
        }, 0);
    }

    ngOnInit(): void {
        this._id = !this.id ? `button-${nextId++}` : `${this.id}-button`;
    }

}
