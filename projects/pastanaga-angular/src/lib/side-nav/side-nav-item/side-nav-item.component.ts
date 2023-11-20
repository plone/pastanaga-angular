import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { trimString } from '../../common';

@Component({
  selector: 'pa-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavItemComponent {
  @Input({ transform: booleanAttribute }) active = false;
  @Input({ transform: booleanAttribute }) header = false;
  @Input({ transform: trimString }) label = '';
}
