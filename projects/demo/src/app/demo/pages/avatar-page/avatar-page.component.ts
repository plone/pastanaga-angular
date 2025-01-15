import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { avatar } from '../../demo.component';

@Component({
  selector: 'app-avatar-page',
  templateUrl: './avatar-page.component.html',
  styleUrls: ['./avatar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AvatarPageComponent {
  image: Observable<Blob> = avatar;

  code = `<pa-avatar userName="Steve Jobs"
           size="small"
           autoBackground
></pa-avatar>`;
}
