import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'pa-table-lead-cell-multi-line',
  templateUrl: './table-lead-cell-multi-line.component.html',
  styleUrls: ['./table-lead-cell-multi-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableLeadCellMultiLineComponent {
  @Input()
  get clickable(): boolean {
    return this._clickable;
  }
  set clickable(value: any) {
    this._clickable = coerceBooleanProperty(value);
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _disabled = false;
  private _clickable = false;
}
