import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { PopoverDirective } from '@guillotinaweb/pastanaga-angular';

@Component({
  templateUrl: './popover-page.component.html',
  styleUrls: ['./popover-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverPageComponent {
  codeSample = `To: some@email.com, other@email.com, any@email.com,
<div class="container">
    <div class="more" [paPopover]="moreRecipientsPopup">
        and 3 more
    </div>
    <pa-popover #moreRecipientsPopup>
        To: first@more.com, second@more.com, third@more.com
    </pa-popover>
</div>`;

  offsetSample = `<pa-button icon="info"
           #popoverDirective="paPopoverRef"
           [paPopover]="refreshHelp"
           paPopoverOffset="4px">Refresh</pa-button>
<pa-popover #refreshHelp>This popover has a 4px offset</pa-popover>`;

  @ViewChild('popoverDirective') popoverDirective?: PopoverDirective;

  openProgrammatically(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.popoverDirective) {
      this.popoverDirective.toggle();
    }
  }
}
