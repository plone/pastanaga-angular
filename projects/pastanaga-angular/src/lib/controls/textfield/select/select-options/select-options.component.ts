import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../control.model';

@Component({
    selector: 'pa-select-options',
    templateUrl: './select-options.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionsComponent {
    @Input() options: (OptionModel | OptionSeparator | OptionHeaderModel)[] = [];
    @Output() optionSelected = new EventEmitter<OptionModel>();

    selectOption(option: OptionModel) {
        this.optionSelected.emit(option);
    }
}
