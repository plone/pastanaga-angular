import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { markForCheck } from '../../common/utils';
import { ControlModel } from '../control.model';

const firstLetterRegExp = new RegExp('[a-zA-Z]');

@Component({
    selector: 'pa-directory',
    templateUrl: 'directory.component.html',
    styleUrls: ['./directory.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DirectoryComponent {
    @Input() set values(values: ControlModel[]) {
        this._values = values;
        this.createMap();
    }
    directory = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
                 'V', 'W', 'X', 'Y', 'Z'];
    labelMap?: { [key: string]: string[] };
    _selectedLetter = '';
    _values: ControlModel[] = [];
    @Output() selected: EventEmitter<{letter: string, selection: string[]}> = new EventEmitter();

    constructor(private cdr: ChangeDetectorRef) {}

    createMap() {
        const map: {[key: string]: any[]} = {'#': []};
        this.directory.forEach(letter => map[letter] = []);

        if (!!this._values) {
            this._values.forEach(value => {
                const firstCharIndex = !!value.label ? value.label.search(firstLetterRegExp) : -1;
                const letter = firstCharIndex !== -1 && value.label.substr(firstCharIndex, 1).toUpperCase();
                if (!!letter && map[letter]) {
                    map[letter].push(value.label);
                } else {
                    map['#'].push(value.label);
                }
            });
        }
        this.labelMap = map;
    }

    onFilter(letter) {
        if (!!this._values) {
            if (this._selectedLetter === letter) {
                this.dismissSelection();
            } else {
                this._selectedLetter = letter;
                this.filter();
            }
            markForCheck(this.cdr);
        }
    }

    filter() {
        if (!!this.labelMap && !!this._values && !!this._selectedLetter) {
            const labelMap = this.labelMap;
            const selectedLetter = this._selectedLetter;
            this.selected.emit({
                letter: this._selectedLetter,
                selection: this._values
                    .filter(v => !!v.value && labelMap[selectedLetter].indexOf(v.label) >= 0)
                    .map(v => v.value as string),
            });
        }
    }

    dismissSelection() {
        if (!!this._values) {
            this._selectedLetter = '';
            this.selected.emit({
                letter: '',
                selection: this._values.filter(v => !!v.value).map(v => v.value as string),
            });
        }
    }
}
