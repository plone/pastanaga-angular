/* tslint:disable:directive-selector */
import { Directive } from '@angular/core';

@Directive({
  selector: 'pa-modal-title',
  standalone: false,
})
export class ModalTitleDirective {}

@Directive({
  selector: 'pa-modal-description',
  standalone: false,
})
export class ModalDescriptionDirective {}

@Directive({
  selector: 'pa-modal-content',
  standalone: false,
})
export class ModalContentDirective {}

@Directive({
  selector: 'pa-modal-image',
  standalone: false,
})
export class ModalImageDirective {}

@Directive({
  selector: 'pa-modal-footer',
  standalone: false,
})
export class ModalFooterDirective {}
