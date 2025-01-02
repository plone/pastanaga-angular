import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseChip } from '../base-chip';

@Component({
  selector: 'pa-chip',
  templateUrl: './chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChipComponent extends BaseChip {}
