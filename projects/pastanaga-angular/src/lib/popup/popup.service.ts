import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PositionStyle } from '../common';

@Injectable({ providedIn: 'root' })
export class PopupService {
  closeAllPopups: Subject<void> = new Subject<void>();
  closeAllButId: Subject<string> = new Subject<string>();
  closeAllSubMenu: Subject<void> = new Subject<void>();
  lastPosition?: PositionStyle;
}
