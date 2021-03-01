import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { detectChanges, markForCheck } from '../../../common';
import { PaFormControlDirective } from '../../form-field/pa-form-control.directive';
import { NgControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { IErrorMessages } from '../../form-field.model';

@Component({
    selector: 'pa-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent extends PaFormControlDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() errorMessages?: IErrorMessages;
    @Input()
    get hasFocus(): boolean {
        return this._hasFocus;
    }
    set hasFocus(value: boolean) {
        this._hasFocus = coerceBooleanProperty(value);
    }
    private _hasFocus = false;
    @Input() help?: string;

    @ViewChild('inputElement') input?: ElementRef;
    @ViewChild('label') labelElement?: ElementRef;
    label = '';
    hasLabel = true;

    isChecked = false;
    describedById?: string;

    constructor(
        protected element: ElementRef,
        @Optional() @Self() protected parentControl: NgControl,
        protected cdr: ChangeDetectorRef,
        private renderer: Renderer2,
    ) {
        super(element, parentControl, cdr);
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes.hasFocus && !!this.input) {
            if (changes.hasFocus.currentValue) {
                this.input.nativeElement.focus();
            } else {
                this.input.nativeElement.blur();
            }
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.isChecked = this.control.value;
    }

    ngAfterViewInit() {
        this;
        this.control.valueChanges.pipe(takeUntil(this.terminator$)).subscribe((val) => {
            this.isChecked = val;
            detectChanges(this.cdr);
        });
        this.control.statusChanges.pipe(takeUntil(this.terminator$)).subscribe((status) => {
            this.describedById = status === 'INVALID' ? `${this.id}-hint` : undefined;
            detectChanges(this.cdr);
        });
        if (this._hasFocus && !!this.input) {
            this.input.nativeElement.focus();
        }
        if (!!this.labelElement) {
            this.label = this.labelElement.nativeElement.textContent.trim();
            // avoid expressionChanged after it was checked since _hasLabel is true by default
            setTimeout(() => {
                this.updateLabelDisplay();
            });
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    updateState(event: boolean) {
        if (!this.control.disabled) {
            this.control.setValue(event);
        }
    }

    updateLabelDisplay() {
        this.hasLabel = this.label.length > 0;
        markForCheck(this.cdr);
    }

    onFocus() {
        this._hasFocus = true;
    }

    onBlur() {
        this._hasFocus = false;
    }

    setDisabledState(isDisabled: boolean): void {
        super.setDisabledState(isDisabled);
        if (this.input) {
            this.renderer.setProperty(this.input?.nativeElement, 'disabled', isDisabled);
        }
    }
}
