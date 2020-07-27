import { Directive } from '@angular/core';

@Directive({ selector: 'pa-modal-title' })
export class ModalTitleDirective {}

@Directive({ selector: 'pa-modal-description' })
export class ModalDescriptionDirective {}

@Directive({ selector: 'pa-modal-content' })
export class ModalContentDirective {}

@Directive({ selector: 'pa-modal-image' })
export class ModalImageDirective {}

@Directive({ selector: 'pa-modal-footer' })
export class ModalFooterDirective {}
