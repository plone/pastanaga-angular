import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Avatar } from './avatar.model';
import { getAvatarColor, getInitials } from './avatar.utils';
import { Observable } from 'rxjs';
import { detectChanges } from '../common/utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
    @Input() set avatar(value: Avatar) {
        if (!!value) {
            this._avatar = value;
            this.initials = getInitials(value.username);

            const identifier = value.id || value.username;
            if (identifier) {
                this.colorClass = `pa-avatar-${getAvatarColor(identifier)}`;
            }

            if (!!value.image) {
                this.loadImage(value.image);
            }

            if (!this.tooltip) {
                this.tooltip = value.username;
            }
        }
    }
    @Input() set size(value: 'small' | 'regular') {
        this.sizeClass = !value || value === 'regular' ? '' : `pa-avatar-${value}`;
    }
    @Input() set src(value: string) {
        this.base64Image = value;
    }
    @Input() set isButton(value) { this._isButton = coerceBooleanProperty(value); }
    @Input() tooltip?: string;

    _avatar: Avatar = new Avatar({username: ''});
    _isButton = false;
    initials = '?';
    colorClass = '';
    sizeClass = '';
    base64Image?: string;

    constructor(
        protected cdr: ChangeDetectorRef,
    ) {
    }

    loadImage(obs: Observable<Blob>) {
        obs.subscribe((blob: Blob) => {
            if (blob.size > 0) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    this.base64Image = (reader.result as string);
                    detectChanges(this.cdr);
                }, false);
                reader.readAsDataURL(blob);
            } else {
                this.base64Image = '';
                detectChanges(this.cdr);
            }
        });
    }
}
