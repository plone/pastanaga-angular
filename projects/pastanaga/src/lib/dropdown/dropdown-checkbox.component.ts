import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { keyCodes } from '../keycodes.constant';
import { ControlModel } from '../controls/control.model';
import { PopupDirective } from '../popup/popup.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-dropdown-checkbox',
    templateUrl: 'dropdown-checkbox.component.html',
    styleUrls: ['./dropdown-checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DropdownCheckboxComponent {
    @Input() set checkboxes(values: ControlModel[]) {
        if (!!values) {
            this._checkboxes = values;
            this.getLabels();
            this.setSelection();
        }
    }
    _checkboxes: ControlModel[] = [];

    @Input() set values(values: string[]) {
        if (!!values) {
            this._values = values;
            this.setSelection();
        }
    }
    _values: string[] = [];

    @Input() label?: string;
    @Input() set disabled(value) { this.isDisabled = coerceBooleanProperty(value); }
    isDisabled = false;

    @Output() valuesChange: EventEmitter<string[]> = new EventEmitter();
    @Output() onOpen: EventEmitter<void> = new EventEmitter();
    @Output() onClose: EventEmitter<void> = new EventEmitter();

    @ViewChild('menuRef', { read: PopupDirective, static: false }) menuRef?: PopupDirective;

    labels: {[value: string]: string} = {};

    constructor(private changeDetector: ChangeDetectorRef) {}

    getLabels() {
        this.labels = (this.checkboxes || []).reduce((all, current) => {
            if (!!current.value) {
                all[current.value] = current.label || current.value;
            }
            return all;
        }, {});
    }

    setSelection() {
        this._checkboxes = this._checkboxes.map(checkbox => ({
            ...checkbox,
            isSelected: !!checkbox.value && this._values.includes(checkbox.value),
        }));
    }

    updateValue(checkbox: ControlModel, isSelected: boolean) {
        const value = checkbox.value;
        if (!!value) {
            if (isSelected && this._values.indexOf(value) === -1) {
                this._values.push(value);
            }
            if (!isSelected && this._values.indexOf(value) > -1) {
                this._values = this._values.filter(v => v !== value);
            }
            this.valuesChange.emit(this._values);
        }
    }

    _onClose() {
        this.changeDetector.detectChanges();
        this.onClose.emit();
    }

    onClickArrow($event: KeyboardEvent) {
        if ($event.keyCode === keyCodes.enter) {
            const element = $event.srcElement as HTMLElement;
            if (!!element.parentElement) {
                element.parentElement.click();
            }
        }
    }

    openMenu(event: MouseEvent) {
        if (!!this.menuRef) {
            this.menuRef.remoteClick({event, isContextual: false, ignoreRemote: true});
            this.onOpen.emit();
        }
    }
}
