import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PopupService } from '../../popup';
import { markForCheck } from '../../common';
import { IconModel } from '../../icon';
import { AvatarModel } from '../../avatar';

@Component({
  selector: 'pa-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements AfterContentInit {
  @Input()
  set value(value: string) {
    this._value = value || '';
  }
  get value(): string {
    return this._value;
  }

  @Input()
  set avatar(value: AvatarModel | undefined) {
    this._avatar = value;
  }
  get avatar() {
    return this._avatar;
  }

  @Input()
  set icon(value: string | IconModel | undefined) {
    this.iconName = typeof value === 'string' ? value : '';
    this._icon = typeof value === 'object' ? value : undefined;
  }
  get icon(): string | IconModel {
    return this._icon || this.iconName;
  }

  @Input()
  set destructive(value: any) {
    this._destructive = coerceBooleanProperty(value);
  }
  get destructive(): boolean {
    return this._destructive;
  }

  @Input()
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set selected(value: any) {
    this._selected = coerceBooleanProperty(value);
    // when selected is triggered programmatically by a parent component
    // change detection must be triggered manually
    markForCheck(this.cdr);
  }
  get selected(): boolean {
    return this._selected;
  }

  @Input()
  set dontCloseOnSelect(value: any) {
    this._dontCloseOnSelect = coerceBooleanProperty(value);
  }
  get dontCloseOnSelect(): boolean {
    return this._dontCloseOnSelect;
  }

  @Input()
  set readonly(value: any) {
    this._readonly = coerceBooleanProperty(value);
  }
  get readonly(): boolean {
    return this._readonly;
  }

  @Input()
  set description(value: string | undefined) {
    if (!!value) {
      this._description = value;
    }
  }
  get description() {
    return this._description;
  }

  @Input()
  set iconOnRight(value: any) {
    this._iconOnRight = coerceBooleanProperty(value);
  }
  get iconOnRight(): boolean {
    return this._iconOnRight;
  }

  @Output() selectOption: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter<MouseEvent | KeyboardEvent>();

  text = '';
  iconName = '';
  _icon?: IconModel;
  _hidden = false;

  private _value = '';
  private _disabled = false;
  private _selected = false;
  private _destructive = false;
  private _dontCloseOnSelect = false;
  private _readonly = false;
  private _iconOnRight = false;
  private _avatar?: AvatarModel;
  private _description = '';

  constructor(
    private element: ElementRef,
    private popupService: PopupService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentInit() {
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

      if (!this._dontCloseOnSelect) {
        this.popupService.closeAllPopups.next();
      }
    } else {
      $event.stopPropagation();
      $event.preventDefault();
    }
  }
}
