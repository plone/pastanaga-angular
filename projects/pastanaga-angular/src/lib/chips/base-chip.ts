import { booleanAttribute, Directive, Input } from '@angular/core';
import { AvatarModel } from '../avatar';
import { IconModel } from '../icon';
import { trimString } from '../common';

@Directive()
export class BaseChip {
  @Input() avatar?: AvatarModel;
  @Input() icon?: IconModel;

  @Input() ariaRole = 'listitem';

  @Input() value?: any;

  @Input({ transform: trimString }) backgroundColor = '';
  @Input({ transform: trimString }) textColor = '';
  @Input({ transform: trimString }) borderColor = '';

  @Input({ transform: booleanAttribute }) disabled = false;
}
