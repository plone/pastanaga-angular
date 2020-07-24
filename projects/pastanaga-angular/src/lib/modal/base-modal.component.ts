import {
    AfterContentInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ModalConfig, ModalRef } from './modal.model';
import { detectChanges, Keys } from '../common';

/**
 * All modal components must have a modal property of type BaseModalComponent (needed to manage modals in ModalService)
 *
 * Example:
 * ```typescript
 * @ViewChild(ModalComponent, { static: true }) modal: ModalComponent | undefined;
 * ```
 */
export interface IModal {
    modal: BaseModalComponent | undefined;
}

@Directive()
export class BaseModalComponent implements OnInit, AfterContentInit {
    @Output() onEnter: EventEmitter<void> = new EventEmitter();

    @ViewChild('modalContainer', { static: true }) modalContainer?: ElementRef;

    ref?: ModalRef;
    closing = false;
    off = false;
    id = 0;
    config = new ModalConfig();

    protected _onKeyDown = this.onKeyDown.bind(this);

    constructor(protected cdr: ChangeDetectorRef) {}

    ngAfterContentInit(): void {
        document.addEventListener('keydown', this._onKeyDown);
    }

    ngOnInit() {
        if (!!this.ref) {
            this.id = this.ref.id;
            this.config = this.ref.config;
        }
    }

    close(data?: any) {
        if (!this.closing) {
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
    }

    outsideClick($event: MouseEvent) {
        if (($event.target as HTMLElement).className === 'pa-modal-backdrop') {
            $event.preventDefault();
            if (!this.config.blocking) {
                this.close(false);
            }
        }
    }

    setFocus() {
        if (!!this.modalContainer) {
            this.modalContainer.nativeElement.focus();
        }
    }

    protected onKeyDown($event: KeyboardEvent) {
        if ($event.key === Keys.enter) {
            $event.stopPropagation();
            this.onEnter.emit();
        } else if ($event.key === Keys.esc && !!this.ref && this.ref.isLast && this.config.withCloseButton) {
            this.close(false);
            $event.stopPropagation();
        }
    }
}
