import { Component, ChangeDetectionStrategy } from '@angular/core';

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
}
