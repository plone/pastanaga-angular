import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';

@Component({
  selector: 'pa-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent extends BaseModalComponent implements AfterViewInit {
  override ngAfterViewInit() {
    super.ngAfterViewInit();

    this.setFocus();
    this.refresh();
  }
}
