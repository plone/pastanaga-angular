import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pa-demo-native-text-field-usage',
  templateUrl: './native-text-field-usage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NativeTextFieldUsageComponent {
  @Input() native = false;
}
