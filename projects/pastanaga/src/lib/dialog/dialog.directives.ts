import { Directive } from '@angular/core';

@Directive({ selector: 'pa-dialog-title' })
export class DialogTitleDirective {}

@Directive({ selector: 'pa-dialog-image' })
export class DialogImageDirective {}

@Directive({ selector: 'pa-dialog-footer' })
export class DialogFooterDirective {}

@Directive({ selector: 'pa-confirm-title' })
export class ConfirmTitleDirective {}

@Directive({ selector: 'pa-confirm-description' })
export class ConfirmDescriptionDirective {}

@Directive({ selector: 'pa-confirm-actions' })
export class ConfirmActionsDirective {}
