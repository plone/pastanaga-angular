import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModel } from '../avatar';
import { TranslatePipe } from '../translate';

@Component({
  selector: 'pa-avatar-pile',
  templateUrl: './avatar-pile.component.html',
  styleUrls: ['./avatar-pile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AvatarPileComponent {
  readonly max = 3;

  @Input()
  set avatars(value: AvatarModel[]) {
    if (!!value) {
      this._avatars = value;
    }
  }
  get avatars() {
    return this._avatars;
  }

  @Input({ transform: booleanAttribute }) customButton = false;
  @Input({ transform: booleanAttribute }) buttonAlwaysVisible = false;

  @Input()
  set buttonTooltip(value: string) {
    this._buttonTooltip = value;
  }
  get buttonTooltip() {
    return this._buttonTooltip || this.translate.transform('pastanaga.show', { type: this.avatarCount + ' members' });
  }

  @Output() clickOnMore: EventEmitter<void> = new EventEmitter();

  get visibleAvatars() {
    return this._avatars.slice(0, this.max);
  }
  get avatarCount() {
    return this._avatars.length;
  }
  get buttonPositionCount() {
    return Math.min(this._avatars.length, this.max);
  }

  private _avatars: AvatarModel[] = [];
  private _buttonTooltip = '';

  constructor(private translate: TranslatePipe) {}

  onClick() {
    this.clickOnMore.emit();
  }
}
