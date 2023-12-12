import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PopupService } from '../../popup';
import { trimString } from '../../common';
import { IconModel } from '../../icon';
import { AvatarModel } from '../../avatar';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

function iconAttribute(value: string | IconModel | null | undefined): IconModel | null | undefined {
  if (typeof value === 'string') {
    return !!value ? { name: value } : null;
  } else {
    return value;
  }
}

@Component({
  selector: 'pa-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements AfterViewInit {
  @Input({ transform: booleanAttribute }) destructive = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) dontCloseOnSelect = false;
  @Input({ transform: booleanAttribute }) iconOnRight = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: trimString }) description = '';
  @Input({ transform: trimString }) value = '';
  @Input({ transform: iconAttribute }) icon?: IconModel;
  @Input() avatar?: AvatarModel;

  @Input()
  set selected(value: any) {
    this._selected = coerceBooleanProperty(value);
    // when selected is triggered programmatically by a parent component
    // change detection must be triggered manually
    // (as of angular v17, cannot be done in a transform function nor in ngOnChanges)
    this.cdr.markForCheck();
  }
  get selected(): boolean {
    return this._selected;
  }
  private _selected = false;

  @Output() selectOption: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter<MouseEvent | KeyboardEvent>();

  text = '';

  constructor(
    private element: ElementRef,
    private popupService: PopupService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.text = this.element.nativeElement.textContent.trim();
  }

  onSelectClick($event: MouseEvent) {
    this.onSelect($event);
  }
  onSelectEnter($event: Event) {
    this.onSelect($event as KeyboardEvent);
  }

  onSelect($event: MouseEvent | KeyboardEvent) {
    if (!this.disabled && !this.readonly) {
      this.selectOption.emit($event);

      if (!this.dontCloseOnSelect) {
        this.popupService.closeAllPopups.next();
      }
    } else {
      $event.stopPropagation();
      $event.preventDefault();
    }
  }
}
