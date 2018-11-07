import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    AfterViewInit,
    Output,
    ɵlooseIdentical,
    ViewChild
} from '@angular/core';
import * as MediumEditor from 'medium-editor';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'pa-richtext',
  templateUrl: 'richtext.component.html',
  styleUrls: ['textfield.scss', 'richtext.component.scss'],
})
export class RichtextComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy, AfterViewInit {

  private lastViewModel: string;
  private editor: any;
  private active: boolean;
  private htmlContent: string;
  @Input() id: string;
  @Input() name: string;
  @Input() value = '';
  @Input() errorHelp: string;
  @Input() placeholder: string;
  @Input() help: string;
  @Input() isRequired: boolean;
  @Input() pattern: RegExp;
  @Input() isDisabled: boolean;
  @Input() isReadOnly: boolean;
  @Input() isLabelHidden: boolean;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() keyUp: EventEmitter<any> = new EventEmitter();
  helpId: string;
  onChange: any;
  onTouched: any;
  errors = {
      required: false,
      pattern: false,
  };

  @Input('editorModel') model: any;
  @Input('editorOptions') options: any;

  constructor() { }

  ngOnInit() {
    this.active = true;

    if (this.placeholder && this.placeholder.length) {
      this.options.placeholder = {
        text : this.placeholder
      };
    }
  }

  ngAfterViewInit() {
    this.editor = new MediumEditor('.me-editable', this.options);
    this.editor.setContent(this.model);
    this.editor.subscribe('editableInput', (event, editable) => {
      this.updateModel();
    });
  }

  refreshView() {
    if (this.editor) {
      this.editor.setContent(this.model);
    }
  }

  ngOnChanges(changes): void {
    if (this.isPropertyUpdated(changes, this.lastViewModel)) {
      this.lastViewModel = this.model;
      this.refreshView();
    }
  }

  writeValue(value: any) {
    this.lastViewModel = value;
  }

  registerOnTouched(handler: any) {
    this.onTouched = handler;
  }

  registerOnChange(handler: any) {
      this.onChange = handler;
  }

  setDisabledState(isDisabled: boolean) {
      this.isDisabled = isDisabled;
  }

  /**
   * Emit updated model
   */
  updateModel(): void {
    let value = this.editor.getContent();
    value = value.replace(/&nbsp;/g, '').trim();
    this.lastViewModel = value;
    this.valueChange.emit(value);
  }

  /**
   * Remove MediumEditor on destruction of directive
   */
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  isPropertyUpdated(changes, viewModel) {
    if (!changes.hasOwnProperty('model')) { return false; }

    const change = changes.model;

    if (change.isFirstChange()) {
      return true;
    }
    return !ɵlooseIdentical(viewModel, change.currentValue);
  }
}
