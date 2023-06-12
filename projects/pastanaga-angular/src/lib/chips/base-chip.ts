import { Directive, Input } from '@angular/core';
import { AvatarModel } from '../avatar';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { IconModel } from '../icon';

@Directive()
export class BaseChip {
  @Input() avatar?: AvatarModel;
  @Input() icon?: IconModel;

  @Input() ariaRole = 'listitem';

  @Input() value?: any;

  @Input() backgroundColor?: string;
  @Input() textColor?: string;
  @Input() borderColor?: string;

  @Input() set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled() {
    return this._disabled;
  }
  private _disabled = false;
}
