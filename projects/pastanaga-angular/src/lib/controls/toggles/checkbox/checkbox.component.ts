import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { BaseControl } from '../../base-control';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges } from '../../../common';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { PaFormControlDirective } from '../../form-field/pa-form-control.directive';

@Component({
    selector: 'pa-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends PaFormControlDirective implements OnChanges, AfterViewInit {
    @Input() required?: boolean;

    @ViewChild('htmlElement') htmlElementRef?: ElementRef;

    fieldType = 'checkbox';

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
        // TODO: we have a validation but no message handling nor error style
        if (changes.required) {
            if (changes.required.currentValue) {
                this.internalValidatorsMap.set('required', Validators.required);
            } else {
                this.internalValidatorsMap.delete('required');
            }
            this.validatorChanged$.next();
        }
    }

    ngAfterViewInit() {
        this.control.valueChanges.subscribe((val) => {
            this.isChecked = val;
        });
    }
    setDisabledState(isDisabled: boolean): void {
        super.setDisabledState(isDisabled);
        if (this.htmlElementRef) {
            this.renderer.setProperty(this.htmlElementRef?.nativeElement, 'disabled', isDisabled);
        }
    }
}
