import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import { ModalConfig, ModalRef } from './modal.model';
import { detectChanges, Keys, TRANSITION_DURATION } from '../common';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseModalComponent implements AfterViewInit {
    @Output() enterPressed: EventEmitter<void> = new EventEmitter();

    @ViewChild('modalContainer') modalContainer?: ElementRef;

    closing = false;
    off = false;
    id = 0;
    config = new ModalConfig();

    protected _onKeyDown = this.onKeyDown.bind(this);

    constructor(public ref: ModalRef, protected cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        if (!!this.ref) {
            this.id = this.ref.id;
            this.config = this.ref.config;
        }
        document.addEventListener('keydown', this._onKeyDown);
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
                    this.ref.close(data);
                }
            }, TRANSITION_DURATION.moderate);
        }
    }

    outsideClick($event: MouseEvent) {
        if (($event.target as HTMLElement).className.includes('pa-modal-backdrop')) {
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

    refresh() {
        detectChanges(this.cdr);
    }

    protected onKeyDown($event: KeyboardEvent) {
        if ($event.key === Keys.enter) {
            $event.stopPropagation();
            this.enterPressed.emit();
        } else if ($event.key === Keys.esc && this.ref?.isLast && this.config.closeOnEsc) {
            this.close(false);
            $event.stopPropagation();
        }
    }
}
