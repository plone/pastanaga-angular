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
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;

@Component({
  selector: 'pa-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../controls.scss', './checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() type = 'checkbox';
    @Input() help?: string;
    @Input() icon?: string;
    @Input() name?: string;
    @Input() subLabel?: string;
    @Input() isDisabled = false;
    @Input() isSelected = false;
    @Input() isIndeterminate = false;
    @Input() isLabelHidden = false;
    @Input() isBadgeVisible = false;
    @Input() totalChildren?: number;
    @Input() selectedChildren?: number;
    @Input() set noFocus(value) { this._noFocus = coerceBooleanProperty(value); }
    _noFocus = false;

    @Output() onSelection: EventEmitter<boolean> = new EventEmitter();
    // the following EventEmitters allow two way data-binding
    @Output() isSelectedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('text', { static: false }) textElement?: ElementRef;
    @ViewChild('badge', { static: false }) badge?: ElementRef;
    @ViewChild('ellipsisText', { static: true }) ellipsisText?: ElementRef;

    id = '';
    helpId = '';
    labelMaxWidth: { [key: string]: string } = {};
    hasEllipsis = false;
    tooltipText = '';

    ngOnInit() {
        this.id = `field-${this.type}-${nextId++}`;
        this.name = this.name || this.id;
        this.helpId = `${this.id}-help`;
    }

    ngOnChanges(changes) {
        if (this.isBadgeVisible && changes.selectedChildren && typeof changes.selectedChildren.currentValue === 'number') {
            setTimeout(() => this.setLabelMaxWidth(), 0);
        }
    }

    ngAfterViewInit() {
        if (this.isBadgeVisible && this.selectedChildren && typeof this.selectedChildren === 'number') {
            setTimeout(() => this.setLabelMaxWidth());
        } else {
            setTimeout(() => this.setEllipsis());
        }
    }

    toggleCheckbox() {
        // radio can't be unchecked by clicking on itself
        if (this.type === 'checkbox' || !this.isSelected) {
            this.isSelected = !this.isSelected;
        }

        this.isSelectedChange.emit(this.isSelected);
        this.onSelection.emit(this.isSelected);
    }

    setLabelMaxWidth() {
        if (!!this.badge) {
            const badgeWidth = this.badge.nativeElement.getBoundingClientRect().width;
            this.labelMaxWidth = {'max-width': `calc(100% - ${badgeWidth}px - 12px)`};
            this.setEllipsis();
        }
    }

    setEllipsis() {
        if (!!this.ellipsisText) {
            if (!this.isLabelHidden) {
                this.hasEllipsis = this.ellipsisText.nativeElement.offsetWidth < this.ellipsisText.nativeElement.scrollWidth;
            } else {
                this.hasEllipsis = false;
            }
            if (this.hasEllipsis) {
                this.tooltipText = this.ellipsisText.nativeElement.innerText;
            }
        }
    }
}
