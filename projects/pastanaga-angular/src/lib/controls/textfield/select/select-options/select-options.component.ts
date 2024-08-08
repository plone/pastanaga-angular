import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../control.model';

let optionId = 0;

@Component({
  selector: 'pa-select-options',
  templateUrl: './select-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionsComponent {
  @Input() set options(values: (OptionModel | OptionSeparator | OptionHeaderModel)[]) {
    this.typedOptions = (values || []).map((value) => {
      switch (value.type) {
        case 'header':
          return { id: optionId++, type: 'header', header: value as OptionHeaderModel };
        case 'option':
          return { id: optionId++, type: 'option', option: value as OptionModel };
        case 'separator':
          return { id: optionId++, type: 'separator', separator: value as OptionSeparator };
        default:
          return { id: optionId++, type: 'null' };
      }
    });
  }
  @Output() optionSelected = new EventEmitter<OptionModel>();

  typedOptions: {
    id: number;
    type: 'header' | 'separator' | 'option' | 'null';
    option?: OptionModel;
    header?: OptionHeaderModel;
    separator?: OptionSeparator;
  }[] = [];

  selectOption(option: OptionModel) {
    this.optionSelected.emit(option);
  }
}
