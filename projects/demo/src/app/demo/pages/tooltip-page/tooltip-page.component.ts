import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './tooltip-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TooltipPageComponent {
  importCode = `imports: [
    PaTooltipModule,
]`;
  code = `<pa-button paTooltip="This button has action tooltip" [paTooltipOffset]="15">Hover me 2 seconds</pa-button>
<pa-button paTooltip="This button has system tooltip" paTooltipType="system">Following mouse</pa-button>
<pa-button paTooltip="This tooltip has offset" [paTooltipOffset]="-80">With -80px offset</pa-button>
`;
}
