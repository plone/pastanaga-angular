import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    Optional,
    Renderer2,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { PaFormControlDirective } from '../../form-field';
import { takeUntil } from 'rxjs/operators';
import { IErrorMessages } from '../../form-field.model';
import { detectChanges } from '../../../common';

@Component({
    selector: 'pa-checkbox',
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends PaFormControlDirective implements OnChanges, AfterViewInit {
    @Input() errorMessages?: IErrorMessages;

    @ViewChild('htmlElement') htmlElementRef?: ElementRef;

    fieldType = 'checkbox';
    describedById?: string;
    isChecked = false;

    constructor(
        protected element: ElementRef,
        @Optional() @Self() protected parentControl: NgControl,
        protected cdr: ChangeDetectorRef,
        private renderer: Renderer2,
    ) {
        super(element, parentControl, cdr);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    ngAfterViewInit() {
        this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe((val) => {
            this.isChecked = val;
            detectChanges(this.cdr);
        });
        this.control.statusChanges.pipe(takeUntil(this.terminator$)).subscribe((status) => {
            this.describedById = status === 'INVALID' ? `${this.id}-hint` : undefined;
            detectChanges(this.cdr);
        });
    }

    setDisabledState(isDisabled: boolean): void {
        super.setDisabledState(isDisabled);
        if (this.htmlElementRef) {
            this.renderer.setProperty(this.htmlElementRef?.nativeElement, 'disabled', isDisabled);
        }
    }
}
