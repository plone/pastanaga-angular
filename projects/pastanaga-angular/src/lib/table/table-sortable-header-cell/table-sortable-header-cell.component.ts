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
import { BreakpointObserver } from '../../breakpoint-observer/breakpoint.observer';
import { markForCheck } from '../../common';

@Component({
    selector: 'pa-table-sortable-header-cell',
    templateUrl: './table-sortable-header-cell.component.html',
    styleUrls: ['./table-sortable-header-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableHeaderCellComponent implements OnChanges {
    @Input()
    set active(value: boolean) {
        this._active = coerceBooleanProperty(value);
    }
    get active() {
        return this._active;
    }
    @Input()
    set isDescending(value: boolean) {
        this._isDescending = coerceBooleanProperty(value);
    }
    get isDescending() {
        return this._isDescending;
    }

    @Output() sort = new EventEmitter();

    @ViewChild('cell', { read: ElementRef }) cellElement?: ElementRef;

    icon?: string;

    private _active = false;
    private _isDescending = false;

    constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.active || changes.isDescending) {
            this.updateIcon();
        }
    }

    private updateIcon() {
        this.breakpointObserver.currentMode.subscribe((mode) => {
            if (mode === 'mobile') {
                this.icon = 'chevron-down';
            } else {
                if (!coerceBooleanProperty(this.active)) {
                    this.icon = 'chevron-up';
                } else {
                    this.icon = coerceBooleanProperty(this.isDescending) ? 'arrow-up' : 'arrow-down';
                }
            }
            markForCheck(this.cdr);
        });
    }
}
