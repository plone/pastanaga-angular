import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'pa-table-row',
  templateUrl: 'table-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableRowComponent {
  @Input()
  get hoverable(): boolean {
    return this._hoverable;
  }
  set hoverable(value: any) {
    this._hoverable = coerceBooleanProperty(value);
  }
  private _hoverable = false;

  @Input()
  get clickable(): boolean {
    return this._clickable;
  }
  set clickable(value: any) {
    this._clickable = coerceBooleanProperty(value);
  }
  private _clickable = false;

  @Input()
  get last(): boolean {
    return this._last;
  }
  set last(value: any) {
    this._last = coerceBooleanProperty(value);
  }
  private _last = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;
}
