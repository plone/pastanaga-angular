import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { getAvatarColor, getInitials } from './avatar.utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { detectChanges } from '../common';
import { AvatarModel } from './avatar.model';

@Component({
  selector: 'pa-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() set avatar(value: AvatarModel | undefined | null) {
    if (value?.userName) {
      this.userName = value.userName;
    }
    if (value?.userId) {
      this.userId = value.userId;
    }
    if (value?.imageSrc) {
      this.imageSrc = value.imageSrc;
    }
    if (value?.size) {
      this.size = value.size;
    }
    if (value?.image) {
      this.image = value.image;
    }
    if (typeof value?.autoBackground === 'boolean') {
      this.autoBackground = value?.autoBackground;
    }
  }

  @Input() set userId(value: string | undefined) {
    if (value) {
      this._userId = value;
      this.assignBackgroundColor();
    }
  }
  get userId() {
    return this._userId;
  }

  @Input()
  set userName(value: string | undefined) {
    if (value) {
      this._userName = value;
    }
    this._initials = !!value ? getInitials(value) : '';
    this.assignBackgroundColor();
  }
  get userName() {
    return this._userName;
  }

  @Input()
  set image(value: Observable<Blob> | undefined) {
    if (!!value) {
      this.loadImage(value);
    } else {
      this._base64Image = undefined;
    }
  }

  @Input()
  set imageSrc(value: string | undefined) {
    this._base64Image = value;
  }

  @Input() set autoBackground(value: any) {
    this._autoBackground = coerceBooleanProperty(value);
    this.assignBackgroundColor();
  }
  get autoBackground() {
    return this._autoBackground;
  }

  @Input()
  set size(value: 'tiny' | 'small' | 'medium' | 'huge') {
    if (!!value) {
      this._size = value;
    }
  }
  get size() {
    return this._size;
  }

  @Input()
  set tooltip(value: string) {
    this._tooltip = value || '';
  }
  get tooltip() {
    return this._tooltip || this.userName || '';
  }

  get base64Image() {
    return this._base64Image;
  }
  get backgroundColorClass() {
    return this._backgroundColorClass;
  }
  get initials() {
    return this._initials;
  }

  private _userId = '';
  private _userName = '';
  private _initials = '';
  private _base64Image?: string;
  private _autoBackground = false;
  private _backgroundColorClass?: string;
  private _size: 'tiny' | 'small' | 'medium' | 'huge' = 'medium';
  private _tooltip = '';

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
          false,
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
      let id: string;
      if (this._userId) {
        id = this._userId;
      } else {
        id = this._userName ? this._userName : this._initials;
      }
      backgroundColor = getAvatarColor(id);
    }
    this._backgroundColorClass = `pa-avatar-${backgroundColor}`;
  }
}
