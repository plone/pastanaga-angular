// Imports
import {
  Component,
  Input,
  Output,
  ElementRef,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { NgControl } from '@angular/forms';

import * as MediumEditor from 'medium-editor';

/**
 * Usage :
 * <medium-editor ngModel name="content" class="editable" #content="ngModel" [config]="getConfig()"></medium-editor>
 */
@Component({
  selector: 'medium-editor',
  template: `<textarea #host></textarea>`,
  styleUrls: ['./medium.scss'],
})
export class MediumEditorComponent {

  @Input() config;
  @Input() configFile;

  @Output() change = new EventEmitter();
  @ViewChild('host') host;

  editor = null;
  value = '';
  instance = null;
  ngControl;
  elementRef;

  constructor(elementRef: ElementRef, ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
      this.ngControl = ngControl;
    }
    this.elementRef = elementRef;
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }

  ngAfterViewInit() {
    let config = {};
    config = this.config || {};
    this.editorInit(config);
  };

  editorInit(config) {
    this.editor = new MediumEditor(this.host.nativeElement, config);

    // Change event
    const editable = this.editor.elements[0];
    this.editor.subscribe('editableInput', (event, editable) => {
      const value = this.editor.elements[0].innerHTML;
      // This doesn't work ???
      this.onChange(value);
      this.change.emit(value);
      this.ngControl.viewToModelUpdate(value);
    });
  }

  hackUpdate() {
    if (this.editor) {
      let value = this.value;
      this.ngControl.viewToModelUpdate(value);
      this.change.emit(value);
    }
  }

  writeValue(value) {
    this.value = value;

    if (this.editor) {
      if (value && value !== '') {
        this.editor.elements[0].nextSibling.value = value;
        this.editor.elements[0].innerHTML = (value);
        this.editor.elements[0].setAttribute('data-placeholder', '');
      } else {
        this.editor.elements[0].nextSibling.value = null;
        this.editor.elements[0].innerHTML = '';
        this.editor.elements[0].setAttribute('data-placeholder', '');
      }
    }
  }

  onChange(_) { };
  onTouched() { };
  registerOnChange(fn) { this.onChange = fn; };
  registerOnTouched(fn) { this.onTouched = fn; };
}
