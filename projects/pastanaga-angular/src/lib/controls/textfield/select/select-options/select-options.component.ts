import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionHeaderModel, OptionModel, OptionSeparator } from '../../../control.model';

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
          return { type: 'header', header: value as OptionHeaderModel };
        case 'option':
          return { type: 'option', option: value as OptionModel };
        case 'separator':
          return { type: 'separator', separator: value as OptionSeparator };
        default:
          return { type: 'null' };
      }
    });
  }
  @Output() optionSelected = new EventEmitter<OptionModel>();

  typedOptions: {
    type: 'header' | 'separator' | 'option' | 'null';
    option?: OptionModel;
    header?: OptionHeaderModel;
    separator?: OptionSeparator;
  }[] = [];

  selectOption(option: OptionModel) {
    this.optionSelected.emit(option);
  }
}
