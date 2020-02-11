import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges, markForCheck } from '../../common/utils';
import { LabelIcon } from '../control.model';

let nextId = 0;

@Component({
  selector: 'pa-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../controls.scss', './checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, AfterViewInit {
    @Input() id?: string;
    @Input() type: 'checkbox' | 'radio' = 'checkbox';
    @Input() help?: string;
    @Input() icon?: string;
    @Input() name?: string;
    @Input() subLabel?: string;
    @Input() labelIcons?: LabelIcon[];
    @Input() set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    @Input() set selected(value) { this._selected = coerceBooleanProperty(value); }
    @Input() set indeterminate(value) { this._indeterminate = coerceBooleanProperty(value); }
    @Input() set labelHidden(value) { this._labelHidden = coerceBooleanProperty(value); }
    @Input() set noFocus(value) { this._noFocus = coerceBooleanProperty(value); }
    @Input() set squareCheck(value) { this._squareCheck = coerceBooleanProperty(value); }

    @Output() selection: EventEmitter<boolean> = new EventEmitter();
    // the following EventEmitters allow two way data-binding
    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('text', { static: false }) textElement?: ElementRef;
    @ViewChild('ellipsisText', { static: true }) ellipsisText?: ElementRef;

    _id = '';
    _noFocus = false;
    _indeterminate = false;
    _disabled = false;
    _selected = false;
    _squareCheck = false;
    _labelHidden = false;

    helpId = '';
    extraStyle: { [key: string]: string } = {};
    hasEllipsis = false;
    tooltipText = '';
    hasExtraWidth = false;

    constructor(
        private cdr: ChangeDetectorRef,
        public element: ElementRef,
    ) {}

    ngOnInit() {
        this._id = this.id ? this.id : `field-${this.type}-${nextId++}`;
        this.name = this.name || this._id;
        this.helpId = `${this._id}-help`;
    }

    ngAfterViewInit() {
        setTimeout(() => this.setLabelMaxWidth());
    }

    toggleCheckbox() {
        // radio can't be unchecked by clicking on itself
        if (this.type === 'checkbox' || !this._selected) {
            this._selected = !this._selected;
        }
        markForCheck(this.cdr);
        this.selectedChange.emit(this._selected);
        this.selection.emit(this._selected);
    }

    setLabelMaxWidth(extraWidth?: number) {
        if (!!extraWidth) {
            this.hasExtraWidth = true;
        }
        if (this.hasExtraWidth && !extraWidth) {
            // prevent checkbox inner call to overwrite style with extra width coming from parent
            return;
        }
        const parent = this.element.nativeElement.parentElement;
        if (!!parent) {
            const parentWidth = parent.getBoundingClientRect().width;
            let maxWidth = parentWidth - 24;
            if (!!extraWidth) {
                maxWidth = maxWidth - extraWidth;
            }
            this.extraStyle = {'max-width': `${maxWidth}px`};
            this.setEllipsis();
            detectChanges(this.cdr);
        }
    }

    setEllipsis() {
        if (!!this.ellipsisText) {
            if (!this._labelHidden) {
                this.hasEllipsis = this.ellipsisText.nativeElement.offsetWidth < this.ellipsisText.nativeElement.scrollWidth;
            } else {
                this.hasEllipsis = false;
            }
            if (this.hasEllipsis) {
                this.tooltipText = this.ellipsisText.nativeElement.innerText;
            }
        }
        detectChanges(this.cdr);
    }
}
