import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { getAvatarColor, getInitials } from './avatar.utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { detectChanges, Size } from '../common';


@Component({
    selector: 'pa-avatar',
    templateUrl: './avatar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {

    @Input() set userId(value: string) {
        this._userId = value;
        this.assignColorClass();
    }

    @Input()
    set userName(value: string) {
        if (!!value) {
            this._userName = value;
            this._initials = getInitials(value);
        } else {
            this._userName = undefined;
            this._initials = ' ? ';
        }
        this.assignColorClass();
    }

    @Input()
    set image(value: Observable<Blob>) {
        if (!!value) {
            this.loadImage(value);
        } else {
            this._base64Image = undefined;
        }
    }

    @Input()
    set backgroundColor(value: string) {
        this._backgroundColor = value;
    }

    @Input()
    set large(value: boolean) {
        this._isLarge = coerceBooleanProperty(value);
        this._iconSize = this._isLarge ? Size.medium : Size.xxsmall;
        this._iconAvatarSize = this._isLarge ? Size.xxlarge : Size.medium;
    }

    @Input() icon: string | undefined;
    @Input() iconColor: string | undefined;
    @Input() iconBackgroundColor: string | undefined;
    @Input() alternateText: string | undefined;

    _userId: string | undefined;
    _userName: string | undefined;
    _initials: string = ' ? ';
    _colorClass: string | undefined;
    _backgroundColor: string | undefined;
    _isLarge: boolean = false;
    _base64Image?: string;
    _iconSize = Size.xxsmall;
    _iconAvatarSize = Size.medium;

    constructor(
        private cdr: ChangeDetectorRef,
    ) {
    }

    loadImage(obs: Observable<Blob>) {
        obs.subscribe((blob: Blob) => {
            if (blob.size > 0) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    this._base64Image = (reader.result as string);
                    detectChanges(this.cdr);
                }, false);
                reader.readAsDataURL(blob);
            } else {
                this._base64Image = '';
                detectChanges(this.cdr);
            }
        });
    }

    private assignColorClass() {
        const id = !!this._userId ? this._userId : this._userName ? this._userName : this._initials;
        this._colorClass = `pa-avatar-${getAvatarColor(id)}`;
    }
}
