import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { getAvatarColor, getInitials } from './avatar.utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { detectChanges, Size } from '../common';

@Component({
    selector: 'pa-avatar',
    templateUrl: './avatar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    set imageSrc(value: string) {
        if (!!value) {
            this._base64Image = value;
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

    @Input() set autoBackground(value: boolean) {
        this._autoBackground = coerceBooleanProperty(value);
        this.assignColorClass();
    }

    @Input() icon?: string;
    @Input() iconColor?: string;
    @Input() iconBackgroundColor?: string;
    @Input() alternateText?: string;
    @Input() active = false;

    _userId?: string;
    _userName?: string;
    _initials = ' ? ';
    _colorClass?: string;
    _backgroundColor?: string;
    _isLarge = false;
    _base64Image?: string;
    _iconSize = Size.xxsmall;
    _iconAvatarSize = Size.medium;
    _autoBackground = false;

    constructor(private cdr: ChangeDetectorRef) {}

    loadImage(obs: Observable<Blob>) {
        obs.subscribe((blob: Blob) => {
            if (blob.size > 0) {
                const reader = new FileReader();
                reader.addEventListener(
                    'load',
                    () => {
                        this._base64Image = reader.result as string;
                        detectChanges(this.cdr);
                    },
                    false
                );
                reader.readAsDataURL(blob);
            } else {
                this._base64Image = '';
                detectChanges(this.cdr);
            }
        });
    }

    private assignColorClass() {
        let colorClass = 'default';
        if (this._autoBackground) {
            const id = !!this._userId ? this._userId : this._userName ? this._userName : this._initials;
            colorClass = getAvatarColor(id);
        }
        this._colorClass = `pa-avatar-${colorClass}`;
    }
}
