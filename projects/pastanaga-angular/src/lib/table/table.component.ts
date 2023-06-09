import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pa-table',
  templateUrl: 'table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  @Input()
  get noHeader(): boolean {
    return this._noHeader;
  }
  set noHeader(value: any) {
    this._noHeader = coerceBooleanProperty(value);
  }

  @Input()
  get columns(): string {
    return this._columns;
  }
  set columns(value: string | undefined | null) {
    if (value) {
      this._columns = value;
      this.columnsStyle = this.sanitizer.bypassSecurityTrustStyle(this._columns);
    }
  }
  @Input()
  get noAutoColumnStyle(): boolean {
    return this._noAutoColumnStyle;
  }
  set noAutoColumnStyle(value: any) {
    this._noAutoColumnStyle = coerceBooleanProperty(value);
  }

  private _noAutoColumnStyle = false;
  private _noHeader = false;
  private _columns = 'auto';
  columnsStyle = this.sanitizer.bypassSecurityTrustStyle(this._columns);

  constructor(private sanitizer: DomSanitizer) {}
}
