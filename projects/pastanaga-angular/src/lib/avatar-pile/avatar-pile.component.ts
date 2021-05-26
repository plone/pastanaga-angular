import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModel } from '../avatar/avatar.model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TranslatePipe } from '../translate/translate.pipe';

@Component({
    selector: 'pa-avatar-pile',
    templateUrl: './avatar-pile.component.html',
    styleUrls: ['./avatar-pile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    @Input()
    set customButton(value: boolean) {
        this._customButtonBehavior = coerceBooleanProperty(value);
    }
    get customButton() {
        return this._customButtonBehavior;
    }

    @Input()
    set buttonTooltip(value: string) {
        this._buttonTooltip = value;
    }
    get buttonTooltip() {
        return (
            this._buttonTooltip || this.translate.transform('pastanaga.show', { type: this.avatarCount + ' members' })
        );
    }

    @Output() clickOnMore: EventEmitter<void> = new EventEmitter();

    get visibleAvatars() {
        return this._avatars.slice(0, this.max);
    }
    get avatarCount() {
        return this._avatars.length;
    }

    private _avatars: AvatarModel[] = [];
    private _customButtonBehavior = false;
    private _buttonTooltip = '';

    constructor(private translate: TranslatePipe) {}

    onClick() {
        this.clickOnMore.emit();
    }
}
