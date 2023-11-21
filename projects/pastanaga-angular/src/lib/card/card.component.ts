import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pa-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() cardClick: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter<MouseEvent | KeyboardEvent>();

  onEnter($event: Event) {
    this.onClick($event as KeyboardEvent);
  }

  onClick($event: MouseEvent | KeyboardEvent) {
    if (this.disabled) {
      $event.preventDefault();
      $event.stopPropagation();
    } else {
      this.cardClick.emit($event);
    }
  }
}
