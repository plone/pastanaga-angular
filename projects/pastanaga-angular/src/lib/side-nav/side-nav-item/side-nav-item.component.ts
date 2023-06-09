import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'pa-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavItemComponent {
  @Input()
  get header(): boolean {
    return this._header;
  }
  set header(value: any) {
    this._header = coerceBooleanProperty(value);
  }
  @Input()
  get label(): string {
    return this._label;
  }
  set label(value: string | null) {
    if (value) {
      this._label = value;
    }
  }
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: any) {
    this._active = coerceBooleanProperty(value);
  }

  private _active = false;
  private _header = false;
  private _label = '';
}
