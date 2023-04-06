import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    OnDestroy,
    Output,
    ViewChild,
} from '@angular/core';
import { ModalConfig, ModalRef } from './modal.model';
import { detectChanges, Keys, TRANSITION_DURATION } from '../common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseModalComponent implements AfterViewInit, OnDestroy {
    @Output() enterPressed: EventEmitter<void> = new EventEmitter();

    @ViewChild('modalContainer') modalContainer?: ElementRef;
    @ViewChild('content') modalContent?: ElementRef;

    closing = false;
    off = false;
    id = 0;
    config = new ModalConfig();
    hasScrollbar = false;

    protected _onKeyDown = this.onKeyDown.bind(this);

    protected _terminator = new Subject<void>();

    constructor(public ref: ModalRef, protected cdr: ChangeDetectorRef) {
        this.ref.onClose.pipe(takeUntil(this._terminator)).subscribe(() => this.close());
    }

    ngAfterViewInit() {
        if (!!this.ref) {
            this.id = this.ref.id;
            this.config = this.ref.config;
        }
        document.addEventListener('keydown', this._onKeyDown);
        this.hasScrollbar =
            !!this.modalContent &&
            this.modalContent.nativeElement.offsetHeight < this.modalContent.nativeElement.scrollHeight;
        console.log(`Has scrollbar: ${this.hasScrollbar}`);
    }

    ngOnDestroy() {
        this._terminator.next();
        this._terminator.complete();
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
                    this.ref.dismiss(data);
                    this.closing = false;
                }
            }, TRANSITION_DURATION.moderate);
        }
    }

    outsideClick($event: MouseEvent) {
        if (($event.target as HTMLElement).outerHTML.includes('pa-modal-backdrop')) {
            $event.preventDefault();
            if (this.config.dismissable) {
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
        } else if ($event.key === Keys.esc && this.ref?.isLast && this.config.dismissable) {
            this.close(false);
            $event.stopPropagation();
        }
    }
}
