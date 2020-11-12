import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { getAvatarColor, getInitials } from './avatar.utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { detectChanges } from '../common';

@Component({
    selector: 'pa-avatar',
    templateUrl: './avatar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
    @Input() set userId(value: string) {
        this._userId = value;
        this.assignBackgroundColor();
    }

    @Input()
    set userName(value: string) {
        if (!!value) {
            this._userName = value;
            this._initials = getInitials(value);
        } else {
            this._userName = undefined;
            this._initials = '?';
        }
        this.assignBackgroundColor();
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
        this._base64Image = value;
    }

    @Input() set autoBackground(value: boolean) {
        this._autoBackground = coerceBooleanProperty(value);
        this.assignBackgroundColor();
    }

    @Input() set size(value: 'small' | 'medium' | 'large') {
        if (!!value) {
            this._size = value;
        }
    }
    get size() {
        return this._size;
    }

    _userId?: string;
    _userName?: string;
    _initials = '?';
    _base64Image?: string;
    _autoBackground = false;
    _backgroundColorClass?: string;
    _size: 'small' | 'medium' | 'large' = 'medium';

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

    private assignBackgroundColor() {
        let backgroundColor = 'default';
        if (this._autoBackground) {
            const id = !!this._userId ? this._userId : this._userName ? this._userName : this._initials;
            backgroundColor = getAvatarColor(id);
        }
        this._backgroundColorClass = `pa-avatar-${backgroundColor}`;
    }
}
