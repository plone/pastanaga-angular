import { Component, forwardRef, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextfieldCommon } from './textfield.common';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const TEXTAREA_BASE_HEIGHT = 50;
const TEXTAREA_LINE_LENGTH = 72;

@Component({
    selector: 'pa-textarea',
    templateUrl: 'textarea.component.html',
    styleUrls: ['textfield.scss', 'textarea.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextareaComponent),
        multi: true,
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => TextareaComponent),
        multi: true,
    }],
})
export class TextareaComponent extends TextfieldCommon implements OnInit {
    baseId = 'textarea';
    keyUpDebouncer: Subject<string> = new Subject();
    @ViewChild('element', { static: true }) textarea?: ElementRef;

    constructor(private renderer: Renderer2) {
        super();
    }

    ngOnInit() {
        this.keyUpDebouncer.pipe(
            throttleTime(300),
        ).subscribe((text) => this.updateTextareaSize(text));
    }

    onKeyUp($event) {
        if (!!$event.target && !!$event.target.value) {
            this.keyUpDebouncer.next($event.target.value);
        }
        super.onKeyUp($event);
    }

    private updateTextareaSize(text: string) {
        if (!!this.textarea) {
            const textarea = this.textarea.nativeElement;
            const linesCount = text.split('\n').reduce((count, chunk, index) => {
                let newLinesCount = index > 0 ? 1 : 0;
                if (chunk.length >= TEXTAREA_LINE_LENGTH) {
                    newLinesCount ++;
                }
                return count + newLinesCount;
            }, 0);
            if (linesCount < 5) {
                this.renderer.setStyle(textarea,  'height', `${TEXTAREA_BASE_HEIGHT + (linesCount * 16)}px`);
            }
        }
    }
}
