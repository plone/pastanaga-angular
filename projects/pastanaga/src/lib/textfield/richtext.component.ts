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

let nextId = 0;

@Component({
  selector: 'pa-richtext',
  templateUrl: 'richtext.component.html',
  styleUrls: ['textfield.scss', 'richtext.component.scss'],
})
export class RichtextComponent implements ControlValueAccessor, OnInit, OnDestroy {

  private lastViewModel: string;
  private editor: any;
  private active: boolean;
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

  @Input('editorOptions') options: any;

  constructor() { }

  ngOnInit() {
    this.active = true;
    if (!this.id) {
      this.id = `richtext-${nextId++}`;
    }
    this.name = this.name || this.id;
    if (this.help) {
        this.helpId = `${this.id}-help`;
    }

    if (this.placeholder && this.placeholder.length) {
      this.options.placeholder = {
        text : this.placeholder
      };
    }

    if (this.isDisabled || this.isReadOnly) {
      this.options.disableEditing = true;
    }

    this.options.anchorPreview = {
      /* These are the default options for anchor preview,
         if nothing is passed this is what it used */
      hideDelay: 500,
      previewValueSelector: 'a'
    }

    this.options.anchor = {
      /* These are the default options for anchor form,
         if nothing is passed this is what it used */
      customClassOption: null,
      customClassOptionText: 'Button',
      linkValidation: false,
      placeholderText: 'Paste or type a link',
      targetCheckbox: false,
      targetCheckboxText: 'Open in new window'
    }

    this.options.paste= {
      /* This example includes the default options for paste,
         if nothing is passed this is what it used */
      forcePlainText: true,
      cleanPastedHTML: false,
      cleanReplacements: [],
      cleanAttrs: ['class', 'style', 'dir'],
      cleanTags: ['meta'],
      unwrapTags: []
    }

    this.options.keyboardCommands = {
      /* This example includes the default options for keyboardCommands,
         if nothing is passed this is what it used */
      commands: [
          {
              command: 'bold',
              key: 'B',
              meta: true,
              shift: false,
              alt: false
          },
          {
              command: 'italic',
              key: 'I',
              meta: true,
              shift: false,
              alt: false
          },
          {
              command: 'underline',
              key: 'U',
              meta: true,
              shift: false,
              alt: false
          }
      ],
    }

    this.options.imageDragging = true;
    this.editor = new MediumEditor('.me-editable', this.options);
    this.editor.subscribe('editableInput', (event, editable) => {
      this.change(event.data)
    });
  }


  // refreshView() {
  //   if (this.editor) {
  //     this.editor.setContent(this.model);
  //   }
  // }

  // ngOnChanges(changes): void {
  //   if (this.isPropertyUpdated(changes, this.lastViewModel)) {
  //     this.lastViewModel = this.model;
  //     this.refreshView();
  //   }
  // }

  writeValue(value: any) {
    debugger;
    this.editor.setContent(value);
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

  change(value: any) {
    let all_text = this.editor.getContent();
    this.valueChange.emit(all_text);
    this.keyUp.emit(value);
    if (this.onChange) {
        this.onChange(all_text);
    }
    if (this.onTouched) {
        this.onTouched(all_text);
    }
  }

  /**
   * Emit updated model
   */
  // updateModel(): void {
  //   let value = this.editor.getContent();
  //   value = value.replace(/&nbsp;/g, '').trim();
  //   this.lastViewModel = value;
  //   this.valueChange.emit(value);
  // }

  /**
   * Remove MediumEditor on destruction of directive
   */
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // isPropertyUpdated(changes, viewModel) {
  //   if (!changes.hasOwnProperty('model')) { return false; }

  //   const change = changes.model;

  //   if (change.isFirstChange()) {
  //     return true;
  //   }
  //   return !ɵlooseIdentical(viewModel, change.currentValue);
  // }
}
