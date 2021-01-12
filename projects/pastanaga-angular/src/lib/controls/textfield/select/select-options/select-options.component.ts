import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../control.model';

@Component({
    selector: 'pa-select-options',
    templateUrl: './select-options.component.html',
    styleUrls: ['./select-options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionsComponent implements OnInit {
    @Input() options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    @Output() optionSelected = new EventEmitter<OptionModel>();
    constructor() {}

    ngOnInit(): void {}

    selectOption(option: OptionModel) {
        this.optionSelected.emit(option);
    }
}
