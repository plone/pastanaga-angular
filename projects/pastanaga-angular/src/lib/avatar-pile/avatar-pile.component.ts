import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModel } from '../avatar';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
    set customButton(value: any) {
        this._customButtonBehavior = coerceBooleanProperty(value);
    }
    get customButton() {
        return this._customButtonBehavior;
    }

    @Input()
    set buttonAlwaysVisible(value: any) {
        this._buttonAlwaysVisible = coerceBooleanProperty(value);
    }
    get buttonAlwaysVisible() {
        return this._buttonAlwaysVisible;
    }

    @Input()
    set buttonTooltip(value: string) {
        this._buttonTooltip = value;
    }
    get buttonTooltip() {
        return (
            this._buttonTooltip || `Show ${this.avatarCount} members`
        );
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
    private _customButtonBehavior = false;
    private _buttonAlwaysVisible = false;
    private _buttonTooltip = '';

    constructor() {}

    onClick() {
        this.clickOnMore.emit();
    }
}
