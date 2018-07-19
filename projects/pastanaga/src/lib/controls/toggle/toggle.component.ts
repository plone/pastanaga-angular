import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToggleDivider } from '../toggle.model';

let nextId = 0;

@Component({
    selector: 'pa-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['../controls.scss', './toggle.component.scss']
})
export class ToggleComponent implements OnInit {
    @Input() id: string;
    @Input() imageUrl: string;
    @Input() help: string;
    @Input() divider: ToggleDivider;
    @Input() isSelected: boolean;
    @Output() isSelectedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('text') textElement: ElementRef;

    helpId: string;

    ngOnInit() {
        if (!this.id) {
            this.id = `field-toggle-${nextId++}`;
        }
        this.helpId = `${this.id}-help`;
    }

    toggleSelection() {
        this.isSelected = !this.isSelected;
        this.isSelectedChange.emit(this.isSelected);
    }
}
