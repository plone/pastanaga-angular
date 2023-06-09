import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './scrollbar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarPageComponent {
  code = `<div paScrollableContainer>dynamic scrollbar styling</div>
<div class="pa-scrollable">scrollbars hidden</div>
<div class="pa-scrollable pa-scrolling">scrollbars always visible with custom style</div>
`;
}
