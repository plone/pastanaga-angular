import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './tooltip-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipPageComponent {

    importCode = `imports: [
    PaTooltipModule,
]`;
    code = `<pa-button paTooltip="This button has action tooltip">Hover me 2 seconds</pa-button>
<pa-button paTooltip="This button has system tooltip" paTooltipType="system">Following mouse</pa-button>
<pa-button paTooltip="This tooltip has offset" [paTooltipOffset]="-30">With -30px offset</pa-button>
`;

}
