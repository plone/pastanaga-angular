import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trimString } from '../common';

@Component({
  selector: 'pa-table',
  templateUrl: 'table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnChanges {
  @Input({ transform: booleanAttribute }) noHeader = false;
  @Input({ transform: booleanAttribute }) noAutoColumnStyle = false;
  @Input({ transform: booleanAttribute }) border = false;
  @Input({ transform: trimString }) columns = 'auto';

  columnsStyle = this.sanitizer.bypassSecurityTrustStyle(this.columns);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns']) {
      this.columnsStyle = this.sanitizer.bypassSecurityTrustStyle(this.columns);
    }
  }
}
