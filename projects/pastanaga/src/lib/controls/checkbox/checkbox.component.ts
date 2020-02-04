import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges, markForCheck } from '../../common/utils';

let nextId = 0;

@Component({
  selector: 'pa-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../controls.scss', './checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() type: 'checkbox' | 'radio' = 'checkbox';
    @Input() help?: string;
    @Input() icon?: string;
    @Input() name?: string;
    @Input() subLabel?: string;
    @Input() totalChildren?: number;
    @Input() selectedChildren?: number;
    @Input() set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    @Input() set selected(value) { this._selected = coerceBooleanProperty(value); }
    @Input() set indeterminate(value) { this._indeterminate = coerceBooleanProperty(value); }
    @Input() set labelHidden(value) { this._labelHidden = coerceBooleanProperty(value); }
    @Input() set badgeVisible(value) { this._badgeVisible = coerceBooleanProperty(value); }
    @Input() set noFocus(value) { this._noFocus = coerceBooleanProperty(value); }
    @Input() set squareCheck(value) { this._squareCheck = coerceBooleanProperty(value); }

    @Output() selection: EventEmitter<boolean> = new EventEmitter();
    // the following EventEmitters allow two way data-binding
    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('text', { static: false }) textElement?: ElementRef;
    @ViewChild('badge', { static: false }) badge?: ElementRef;
    @ViewChild('ellipsisText', { static: true }) ellipsisText?: ElementRef;

    _noFocus = false;
    _indeterminate = false;
    _disabled = false;
    _selected = false;
    _squareCheck = false;
    _labelHidden = false;
    _badgeVisible = false;

    id = '';
    helpId = '';
    labelMaxWidth: { [key: string]: string } = {};
    hasEllipsis = false;
    tooltipText = '';

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.id = `field-${this.type}-${nextId++}`;
        this.name = this.name || this.id;
        this.helpId = `${this.id}-help`;
    }

    ngOnChanges(changes) {
        if (this._badgeVisible && changes.selectedChildren && typeof changes.selectedChildren.currentValue === 'number') {
            setTimeout(() => this.setLabelMaxWidth(), 0);
        }
    }

    ngAfterViewInit() {
        if (this._badgeVisible && this.selectedChildren && typeof this.selectedChildren === 'number') {
            setTimeout(() => this.setLabelMaxWidth());
        } else {
            setTimeout(() => this.setEllipsis());
        }
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

    setLabelMaxWidth() {
        if (!!this.badge) {
            const badgeWidth = this.badge.nativeElement.getBoundingClientRect().width;
            this.labelMaxWidth = {'max-width': `calc(100% - ${badgeWidth}px - 12px)`};
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
