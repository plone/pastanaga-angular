import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    SimpleChanges,
    OnChanges,
    OnDestroy,
    ViewChild, ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { sortCheckboxes, getCheckboxValue } from '../checkbox.utils';
import { ControlModel } from '../control.model';
import { TranslatePipe } from '../../translate/translate.pipe';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { markForCheck } from '../../common/utils';

let nextId = 0;

@Component({
    selector: 'pa-filtered-checkbox-group',
    templateUrl: 'filtered-checkbox-group.component.html',
    styleUrls: ['./filtered-checkbox-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteredCheckboxGroupComponent implements OnInit, OnChanges, OnDestroy {
    @Input() id?: string;
    @Input() checkboxes?: ControlModel[];
    @Input() set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    _disabled = false;
    @Input() set shouldSort(value) { this._shouldSort = coerceBooleanProperty(value); }
    _shouldSort = true;
    @Input() set filterThreshold(value: number) { this._filterThreshold = value; }
    _filterThreshold = 20;
    @Input() set directoryThreshold(value: number) { this._directoryThreshold = value; }
    _directoryThreshold = 100;
    @Input() set filterPlaceholder(value: string) { this._filterPlaceholder = value; }
    _filterPlaceholder = 'pastanaga.filter';

    @Output() selection: EventEmitter<string[]> = new EventEmitter();
    @Output() checkboxesChange: EventEmitter<ControlModel[]> = new EventEmitter();

    _id = '';
    _checkboxes: ControlModel[] = [];
    isFiltered = false;
    isAllSelected = false;

    filtered: ControlModel[] = [];
    selectedLetter = '';
    totalCount = 0;
    totalSelected = 0;
    totalFiltered = 0;
    filter = '';
    selectAllLabel = '';
    viewAll = true;
    keyUp: Subject<string> = new Subject();
    terminator = new Subject();
    @ViewChild(CdkVirtualScrollViewport, { static: true }) scrollViewport?: CdkVirtualScrollViewport;
    trackById = (a, b) => (a.id === b.id);

    constructor(
        protected translate: TranslatePipe,
        protected cdr: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this._id = !this.id ? `fieldset-filtered-checkbox-group-${nextId++}` : `${this.id}-filtered-checkbox-group`;
        this.keyUp.pipe(
            takeUntil(this.terminator),
            debounceTime(500),
        ).subscribe(term => {
            this.filter = term;
            this.filterByTerm();
            if (!!this.scrollViewport) {
                this.scrollViewport.scrollToIndex(0);
            }
        });
    }

    ngOnDestroy() {
        this.terminator.next();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes.checkboxes) {
            const values: ControlModel[] = changes.checkboxes.currentValue || [];
            const currentlyFiltered = (this._checkboxes || []).filter(ctl => ctl.isFiltered).map(ctl => ctl.id);
            const checkboxes = values.map(checkbox => new ControlModel({
                ...checkbox,
                isFiltered: currentlyFiltered.includes(checkbox.id),
                label: this.translate.transform(checkbox.label || ''),
            }));
            this._checkboxes = this._shouldSort ? sortCheckboxes(checkboxes) : checkboxes;
            this.isAllSelected = this._checkboxes.every(checkbox => checkbox.isSelected);
            this.totalCount = this._checkboxes.length;
            this.applyFilter();
        }
    }

    toggleSelection() {
        this.updateSelectionCount();
        this.emitSelectionChanged();
    }

    toggleSelectAll() {
        this.isAllSelected = !this.isAllSelected;
        this._checkboxes = this._checkboxes.map(checkbox => new ControlModel({
            ...checkbox,
            isSelected: checkbox.isDisabled || (this.isFiltered && !checkbox.isFiltered) ? checkbox.isSelected : this.isAllSelected,
        }));
        this.applyFilter();
        this.emitSelectionChanged();
    }

    protected updateSelectionCount() {
        this.totalSelected = this._checkboxes.filter(control => control.isSelected).length;
        const label = 'pastanaga.' + (this.isAllSelected ? 'deselect' : 'select') + '-' + (this.isFiltered ? 'filtered' : 'all');
        this.selectAllLabel = this.translate.transform(label);
    }

    private emitSelectionChanged() {
        const selectedValues = (this._checkboxes || []).filter(control => control.isSelected).map(control => getCheckboxValue(control));
        this.selection.emit(selectedValues);
        this.checkboxesChange.emit(this._checkboxes);
    }

    protected filterByTerm() {
        const term = (this.filter || '').toLocaleLowerCase();
        this.selectedLetter = '';
        this._checkboxes = (this._checkboxes || []).map(ctl => ({
            ...ctl,
            isFiltered: !term || ctl.label.toLocaleLowerCase().includes(term) ||
                (!!ctl.subLabel && ctl.subLabel.toLocaleLowerCase().includes(term)),
        }));
        this.applyFilter();
    }

    directorySelection(event: {letter: string, selection: string[]}) {
        this.filter = '';
        this.selectedLetter = event.letter;
        this._checkboxes = (this._checkboxes || []).map(ctl => ({
            ...ctl,
            isFiltered: !ctl.value || event.selection.includes(ctl.value),
        }));
        this.applyFilter();
    }

    protected applyFilter() {
        this.filtered = this._checkboxes.filter(ctl =>
            (ctl.isFiltered || (!this.filter && !this.selectedLetter)) && // we keep filtered ones only, or all if no current filtering
            (this.viewAll || ctl.isSelected) // but when viewing selected only, we just keep selected ones
        );
        this.totalFiltered = this.filtered.length;
        this.isFiltered = this.totalFiltered < (this._checkboxes || []).length;
        this.updateSelectionCount();
        markForCheck(this.cdr);
    }

    viewSelected(event: MouseEvent) {
        event.preventDefault();
        this.viewAll = !this.viewAll;
        if (!this.viewAll) {
            this.filter = '';
            this.selectedLetter = '';
            this._checkboxes = (this._checkboxes || []).map(ctl => ({
                ...ctl,
                isFiltered: true,
            }));
        }
        this.applyFilter();
    }
}
