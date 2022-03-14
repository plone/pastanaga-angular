import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '../../breakpoint-observer';
import { markForCheck } from '../../common';

export const SORTABLE_ICON = 'chevron-down';
export const SORTED_ASCENDING_ICON = 'arrow-down';
export const SORTED_DESCENDING_ICON = 'arrow-up';

@Component({
    selector: 'pa-table-sortable-header-cell',
    templateUrl: './table-sortable-header-cell.component.html',
    styleUrls: ['./table-sortable-header-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableHeaderCellComponent implements OnChanges {
    @Input()
    set enabled(value: any) {
        this._enabled = coerceBooleanProperty(value);
    }
    get enabled() {
        return this._enabled;
    }

    @Input()
    set active(value: any) {
        this._active = coerceBooleanProperty(value);
    }
    get active() {
        return this._active;
    }
    @Input()
    set isDescending(value: any) {
        this._isDescending = coerceBooleanProperty(value);
    }
    get isDescending() {
        return this._isDescending;
    }

    @Output() sort = new EventEmitter();

    @ViewChild('cell', { read: ElementRef }) cellElement?: ElementRef;

    icon?: string;

    private _enabled = false;
    private _active = false;
    private _isDescending = false;

    constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['active'] || changes['isDescending']) {
            this.updateIcon();
        }
    }

    private updateIcon() {
        this.breakpointObserver.currentMode.subscribe((mode) => {
            if (mode === 'mobile') {
                this.icon = SORTABLE_ICON;
            } else {
                if (!this.enabled) {
                    this.icon = SORTABLE_ICON;
                } else {
                    this.icon = coerceBooleanProperty(this.isDescending)
                        ? SORTED_DESCENDING_ICON
                        : SORTED_ASCENDING_ICON;
                }
            }
            markForCheck(this.cdr);
        });
    }
}
