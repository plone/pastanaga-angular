import { AfterContentInit, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DialogConfig, DialogRef } from './dialog.model';
import { keyboardKeys } from '../keycodes.constant';
import { markForCheck, detectChanges } from '../common/utils';


/**
 * All dialog components must have a dialog property of type BaseDialogComponent (needed to manage dialogs in DialogService)
 *
 * Example:
 * ```typescript
 * @ViewChild(DialogComponent, { static: true }) dialog: DialogComponent | undefined;
 * ```
 */
export interface IDialog {
    dialog: BaseDialogComponent | undefined;
}

export class BaseDialogComponent implements AfterContentInit {
    @Output() onEnter: EventEmitter<void> = new EventEmitter();

    @ViewChild('dialogContainer', { static: true }) dialogContainer?: ElementRef;

    ref?: DialogRef;
    closing = false;
    off = false;
    id = 0;
    config: DialogConfig = new DialogConfig();
    protected _onKeyDown = this.onKeyDown.bind(this);

    constructor(protected cdr: ChangeDetectorRef) {}

    ngAfterContentInit(): void {
        document.addEventListener('keydown', this._onKeyDown);
    }

    close(data?: any) {
        this.closing = true;
        document.removeEventListener('keydown', this._onKeyDown);
        detectChanges(this.cdr);
        setTimeout(() => {
            this.off = true;
            detectChanges(this.cdr);
            if (!!this.ref) {
                this.ref.onClose.emit(data);
            }
        }, 700);
    }

    outsideClick($event) {
        if ($event.target.className === 'pa-dialog-backdrop') {
            $event.preventDefault();
            if (!this.config.blocking) {
                this.close(false);
            }
        }
    }

    setFocus() {
        if (!!this.dialogContainer) {
            this.dialogContainer.nativeElement.focus();
        }
    }

    protected onKeyDown($event: KeyboardEvent) {
        if ($event.key === keyboardKeys.enter) {
            $event.stopPropagation();
            this.onEnter.emit();
        } else if ($event.key === keyboardKeys.esc && !!this.ref && this.ref.isLast && this.config.withCloseButton) {
            this.close(false);
            $event.stopPropagation();
        }
    }
}
