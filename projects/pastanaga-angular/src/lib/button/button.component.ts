import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Aspect, Kind, Size, trimString } from '../common';

@Component({
  selector: 'pa-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ButtonComponent implements AfterContentInit {
  @Input() kind: Kind = 'secondary';
  @Input() size: Size = 'medium';
  @Input() aspect: Aspect = 'solid';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) active = false;
  @Input({ transform: booleanAttribute }) iconAndText = false;
  @Input({ transform: trimString }) icon = '';
  @Input() iconSize?: Size;

  @ViewChild('textContainer') textContainer?: ElementRef;

  // accessibility
  ariaLabel = '';

  constructor(protected cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    setTimeout(() => {
      if (!!this.textContainer) {
        this.ariaLabel = this.textContainer.nativeElement.textContent.trim();
        this.cdr.detectChanges();
      }
    }, 0);
  }

  onClick($event: MouseEvent) {
    if (!!$event && this.type !== 'submit') {
      $event.preventDefault();
    }
  }

  clickOnWrapper($event: MouseEvent) {
    if (this.disabled) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }
}
