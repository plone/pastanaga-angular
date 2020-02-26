import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ToggleDivider } from '../toggle.model';

let nextId = 0;

@Component({
    selector: 'pa-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['../controls.scss', './toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements OnInit {
    @Input() id?: string;
    @Input() imageUrl?: string;
    @Input() imageBackground?: string;
    @Input() help?: string;
    @Input() divider?: ToggleDivider;
    @Input() isSelected = false;
    @Input() isDisabled = false;
    @Input() yesLabel = 'common.yes';
    @Input() noLabel = 'common.no';
    @Output() isSelectedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('text') textElement?: ElementRef;

    helpId = '';

    ngOnInit() {
        this.id = !this.id ? `field-toggle-${nextId++}` : `${this.id}-field-toggle`;
        this.helpId = `${this.id}-help`;
    }

    toggleSelection() {
        this.isSelected = !this.isSelected;
        this.isSelectedChange.emit(this.isSelected);
    }
}
