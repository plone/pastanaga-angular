import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'pa-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../controls.scss', './checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

    @Input() type = 'checkbox';
    @Input() help: string;
    @Input() icon: string;
    @Input() id: string;
    @Input() name: string;
    @Input() isDisabled: boolean;
    @Input() isSelected: boolean;
    @Input() isIndeterminate: boolean;
    @Input() isLabelHidden: boolean;

    @Output() selection: EventEmitter<boolean> = new EventEmitter();
    // the following EventEmitters allow two way data-binding
    @Output() isSelectedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() idChange: EventEmitter<string> = new EventEmitter();

    @ViewChild('text') textElement: ElementRef;

    helpId: string;

    ngOnInit() {
        if (!this.id) {
            this.id = `field-${this.type}-${nextId++}`;

            // send new id asynchronously to prevent ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                this.idChange.emit(this.id);
            });
        }

        this.name = this.name || this.id;
        this.helpId = `${this.id}-help`;
    }

    toggleCheckbox() {
        // radio can't be unchecked by clicking on itself
        if (this.type === 'checkbox' || !this.isSelected) {
            this.isSelected = !this.isSelected;
        }

        this.isSelectedChange.emit(this.isSelected);
        this.selection.emit(this.isSelected);
    }

}
