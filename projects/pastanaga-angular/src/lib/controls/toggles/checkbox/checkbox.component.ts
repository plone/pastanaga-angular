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
import { NgControl, Validators } from '@angular/forms';
import { PaFormControlDirective } from '../../form-field/pa-form-control.directive';
import { takeUntil } from 'rxjs/operators';
import { IErrorMessages } from '../../form-field.model';
import { detectChanges } from '../../../common';

@Component({
    selector: 'pa-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends PaFormControlDirective implements OnChanges, AfterViewInit {
    @Input() required?: boolean;
    @Input() errorMessages?: IErrorMessages;

    @ViewChild('htmlElement') htmlElementRef?: ElementRef;

    fieldType = 'checkbox';
    describedById?: string;
    isChecked = false;

    constructor(
        protected element: ElementRef,
        @Optional() @Self() protected parentControl: NgControl,
        protected cdr: ChangeDetectorRef,
        private renderer: Renderer2
    ) {
        super(element, parentControl, cdr);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.required) {
            if (changes.required.currentValue) {
                this.internalValidatorsMap.set('required', Validators.requiredTrue);
            } else {
                this.internalValidatorsMap.delete('required');
            }
            this.validatorChanged$.next();
        }
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
