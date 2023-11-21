import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { getAvatarColor, getInitials } from './avatar.utils';
import { Observable } from 'rxjs';
import { detectChanges, trimString } from '../common';
import { AvatarModel } from './avatar.model';

@Component({
  selector: 'pa-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnChanges {
  @Input() set avatar(value: AvatarModel | undefined | null) {
    if (value?.userName) {
      this.userName = value.userName;
      this._initials = getInitials(value.userName);
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
      this.assignBackgroundColor();
    }
  }

  @Input({ transform: trimString }) userId = '';
  @Input({ transform: trimString }) userName = '';
  @Input({ transform: booleanAttribute }) autoBackground = false;
  @Input() size: 'tiny' | 'small' | 'medium' | 'huge' = 'medium';

  @Input()
  set image(value: Observable<Blob> | null | undefined) {
    if (!!value) {
      this.loadImage(value);
    } else {
      this._base64Image = undefined;
    }
  }

  @Input()
  set imageSrc(value: string | null | undefined) {
    this._base64Image = value || undefined;
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

  private _initials = '';
  private _base64Image?: string;
  private _backgroundColorClass?: string;
  private _tooltip = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['autoBackground'] || changes['userId'] || changes['userName']) {
      this.assignBackgroundColor();
    }
    if (changes['userName']) {
      const value = changes['userName'].currentValue;
      this._initials = !!value ? getInitials(value) : '';
    }
  }

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
    if (this.autoBackground) {
      let id: string;
      if (this.userId) {
        id = this.userId;
      } else {
        id = this.userName ? this.userName : this._initials;
      }
      backgroundColor = getAvatarColor(id);
    }
    this._backgroundColorClass = `pa-avatar-${backgroundColor}`;
  }
}
